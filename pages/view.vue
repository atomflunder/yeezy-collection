<template>
    <HeaderButtons :items="decodedItems" :title="title" parent-page="/view" />

    <div class="p-4">
        <div>Collection Title: {{ title }}</div>
        <div>Decoded items: {{ decodedItems }}</div>
    </div>
</template>

<script setup lang="ts">
// This site will allow you to view your/others' collections.

// TODO: Display at all
// TODO: Group them into the different types (700s together, 350 v2s together etc. etc.) with the UDivider + label

const query = useRoute().query;
const title: string = query.title as string;

// TODO: Proper query validation?
if (!query.items) {
    console.log(title, query);
    await navigateTo("/");
}

const decodedItems = decodeItems(query.items as string);
</script>

<style scoped></style>

