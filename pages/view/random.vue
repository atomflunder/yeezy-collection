<template></template>

<script setup lang="ts">
const { data: randomLink } = await useFetch("/api/collection/random");

if (randomLink.value) {
    await navigateTo(randomLink.value.link.url);
}
</script>

