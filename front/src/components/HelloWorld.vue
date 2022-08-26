<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useTodoStore} from "../stores/todo";
import {storeToRefs} from "pinia";

defineProps<{ msg: string }>()

const state = reactive({newTodoLabel: ""});
// useTodoStore を呼び出すだけで、グローバルストアへのアクセスが可能
const store = useTodoStore();
// ストア内の State や Getters はリアクティブオブジェクトなので、
// リアクティブを失わずに取り出す場合は storeToRefs を用いる
const {filteredTodos, filter} = storeToRefs(store);
const toggleTodo = (id: number) => store.toggleTodo(id);
const addTodo = () => {
    if (state.newTodoLabel !== "") {
        store.addTodo(state.newTodoLabel);
        state.newTodoLabel = "";
    }
};

</script>

<template lang="pug">
h1 {{ msg }}
.todos
    input(v-model="state.newTodoLabel")
    button(@click="addTodo") add

    input#all(type="radio" v-model="filter" value="all")
    label(for="all") すべて
    input#finished(type="radio" v-model="filter" value="finished")
    label(for="finished") 完了済み
    input#unfinished(type="radio" v-model="filter" value="unfinished")
    label(for="unfinished") 未完了

    ul
        li(
            :class="{ todo: true, finished: todo.finished }"
            :key="todo.label"
            v-for="todo in filteredTodos"
            v-text="todo.label"
            @click="toggleTodo(todo.id)"
        )
</template>

<style scoped>
.todo {
    user-select: none;
    cursor: pointer;
}

.todo.finished {
    text-decoration: line-through;
    color: gray;
}
</style>
