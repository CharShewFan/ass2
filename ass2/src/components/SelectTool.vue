<template>
<div>
    Filter Events：
    <select @change='select($event)'>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
    </select>
</div>

</template>

<script>
    import {mapActions} from 'vuex'
    export default{
        name:"SelectTool",
        data(){
            return{

            }
        },
        methods:mapActions(['select'])
    }
</script>