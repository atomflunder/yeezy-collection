<template>
    <div>Collection Title: {{ title }}</div>
    <div>Decoded items: {{ decodedItems }}</div>
</template>

<script setup lang="ts">
// This site will allow you to view your/others' collections.

// TODO: Display at all
// TODO: Group them into the different types (700s together, 350 v2s together etc. etc.) with the UDivider + label

// TODO: Query validation.

const query = useRoute().query;
const title = query.title;
const decodedItems = decodeItems(query.items);
</script>

<style scoped></style>

