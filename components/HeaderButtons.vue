<template>
    <client-only>
        <template #fallback>
            <USkeleton class="h-12 p-4" />
        </template>

        <div class="h-12 p-4">
            <div class="float-left">
                <UButton
                    :icon="
                        isCopyButtonClicked
                            ? 'i-mdi-clipboard-check-multiple-outline'
                            : 'i-mdi-clipboard-multiple-outline'
                    "
                    :label="isCopyButtonClicked ? 'Copied!' : 'Share'"
                    @click="copyShareUrl()"
                    variant="link"
                />
                <UButton
                    v-if="props.parentPage === '/index'"
                    icon="i-mdi-eye-arrow-right"
                    label="View"
                    :to="'/' + getShareUrl()"
                    target="_blank"
                    variant="link"
                />
                <UButton
                    v-else-if="props.parentPage === '/view'"
                    icon="i-mdi-pencil"
                    label="Edit Yours"
                    to="/"
                    target="_blank"
                    variant="link"
                />
            </div>

            <div class="float-right">
                <UButton
                    icon="i-mdi-github"
                    to="/github"
                    target="_blank"
                    color="white"
                    variant="ghost"
                />
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";

const props = defineProps<{
    title: string;
    items: CollectionItem[];
    parentPage: "/index" | "/view";
}>();

function getShareUrl() {
    const title = props.title.slice(0, 80);

    return `view?title=${title}&items=${encodeItems(props.items)}`;
}

let isCopyButtonClicked = ref(false);

async function copyShareUrl() {
    await navigator.clipboard.writeText(useRequestURL() + getShareUrl());

    isCopyButtonClicked.value = true;

    setTimeout(() => {
        isCopyButtonClicked.value = false;
    }, 2000);
}

// TODO: Generate Image Button
</script>

<style scoped></style>

