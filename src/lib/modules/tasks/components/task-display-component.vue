<i18n>
   {
   "en":{
   "done":"Done",
   "edit":"Edit",
   "delete":"Delete"
   },
   "fr":{
   "done":"Faite",
   "edit":"Editer",
   "delete":"Supprimer"
   }
   }
</i18n>
<template>
   <article aeris-task-display-component-host>
      <div v-show="!editMode">
         <div>
            <h3>{{ getTask.title }}</h3>
            <div aeris-task-display-component-date>
               {{ getTask.date }}
            </div>
         </div>
         <aside>
            <input v-model="getTask.done" :id="getTask.id" type="checkbox" @change="taskDoneChanged">
            <label :for="getTask.id" :title="$t('done')"/>
            <div>
               <button :title="$t('edit')" name="edit" type="button" @click="editTask">
                  <i class="fa fa-edit"/>
               </button>
               <button :title="$t('delete')" name="delete" type="button" @click="deleteTask">
                  <i class="fa fa-trash-o"/>
               </button>
            </div>
         </aside>
      </div>
      <div v-show="editMode">
         <task-edit-component :edited-title="getTask.title" :edited-id="getTask.id" @close="closeEdit"/>
      </div>
   </article>
</template>
<script>
export default {
  name: "task-display-component",

  props: {
    task: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      editMode: false
    };
  },

  watch: {
    task() {
      this.editMode = false;
    },
    getLang(lang) {
      this.$i18n.locale = lang;
    }
  },

  computed: {
    getTask() {
      return JSON.parse(this.task);
    },
    getLang() {
      return this.$store.getters.getLang;
    }
  },

  created: function() {
    // to catch in the console in order to debug
    console.log("task component created");
  },
  methods: {
    taskDoneChanged() {
      console.log(this.getTask);
      console.log(this.task);
      console.log("Changed:");
      this.save();
    },
    save() {
      this.$http
        .put(
          "https://services.aeris-data.fr/todolist/todo/edit/" +
            this.getTask.id,
          this.getTask
        )
        .then(
          response => {
            this.handleSuccess(response);
          },
          response => {
            this.handleError(response);
          }
        );
    },
    handleSuccess: function(response) {
      console.log("success");
    },

    handleError: function(response) {
      let error = response.status;
      let message = response.statusText;
      if (!error) message = "Can't connect to the server";
      console.log("Error " + error + ": " + message);
    },
    deleteTask() {
      this.$http
        .delete(
          "https://services.aeris-data.fr/todolist/todo/delete/" +
            this.getTask.id
        )
        .then(
          response => {
            this.handleDeleteSuccess(response);
          },
          response => {
            this.handleError(response);
          }
        );
    },
    handleDeleteSuccess: function(response) {
      this.$store.commit("setRefreshTaskList", true);
    },
    editTask() {
      this.editMode = true;
    },
    closeEdit() {
      this.editMode = false;
    }
  }
};
</script>
<style scoped>
[aeris-task-display-component-host] {
  padding: 20px;
  margin: 20px 0;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
}

[aeris-task-display-component-host] aside {
  display: flex;
  justify-content: space-between;
}

[aeris-task-display-component-host] aside input {
  display: none;
}

[aeris-task-display-component-host] aside label {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  line-height: 20px;
  background: #ddd;
  border-radius: 5px;
}

[aeris-task-display-component-host] aside label:hover {
  cursor: pointer;
  color: #08a5fe;
}

[aeris-task-display-component-host] aside input + label {
  padding: 0 2px;
}

[aeris-task-display-component-host] aside input:checked + label {
  background: #009060;
  border-radius: 5px;
  padding: 0 2px;
}

[aeris-task-display-component-host] aside input + label::before {
  content: "\2714";
  display: block;
  font-size: 1.8rem;
  color: #ccc;
  padding-top: 3px;
}

[aeris-task-display-component-host] aside input:checked + label::before {
  content: "\2714";
  display: block;
  font-size: 1.8rem;
  color: white;
  padding-top: 3px;
}

[aeris-task-display-component-host] aside input {
  width: 20px;
}

[aeris-task-display-component-host] aside button {
  display: inline-block;
  width: 30px;
  margin-right: 3px;
  padding: 5px;
  border: none;
  outline: none;
  border-radius: 5px;
  background: #ddd;
  color: #444;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
}

[aeris-task-display-component-host] aside button:hover {
  color: #08a5fe;
}
</style>
