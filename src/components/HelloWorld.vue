<template>
     
  <div class="mainn">

    <div v-for="user in users" :key="user">
      <h1 v-if="user.isActive == true" style="color: black;"> {{ user.name + ' - ' + user.age }} </h1>
      <h1 v-if="user.isActive == false" style="color: red;"> {{ user.name + ' - ' + user.age }} </h1>
    </div>
  </div>

 </template>
 
 <script>
 export default {
   data() {
     return {
        users: [
{ name: "Alice", age: 25, isActive: true },
{ name: "Bob", age: 17, isActive: true },
{ name: "Charlie", age: 30, isActive: false },
{ name: "David", age: 20, isActive: true },
],
     };
   },
   methods: {
     
   }
 };
 </script>
 
 <style scoped>
 .mainn {
   margin-top: 200px;
 }
 h1 {
   color: rgba(251, 6, 6, 0.954);
 }
 </style>