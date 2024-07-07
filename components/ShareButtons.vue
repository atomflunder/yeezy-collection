<template>
    <client-only>
        <template #fallback>
            <USkeleton class="h-12" />
        </template>

        <div class="h-12">
            <UButton
                :icon="
                    isCopyButtonClicked
                        ? 'i-heroicons-clipboard-document-check'
                        : 'i-heroicons-clipboard-document'
                "
                :label="
                    isCopyButtonClicked
                        ? 'Copied to Clipboard'
                        : 'Share Collection'
                "
                @click="copyShareUrl()"
            />
            <UButton
                icon="i-heroicons-link"
                label="View Collection"
                :to="'/' + getShareUrl()"
                target="_blank"
            />
        </div>
    </client-only>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";

const props = defineProps<{
    title: string;
    items: CollectionItem[];
}>();

function getShareUrl() {
    let base = `view?title=${props.title}`;

    if (props.items.length === 0) {
        return base;
    }

    base += "&items=";

    props.items.map((i) => (base += `${i.item.id}-${i.size},`));

    console.log(base);

    return base;
}

let isCopyButtonClicked = ref(false);

async function copyShareUrl() {
    await navigator.clipboard.writeText(useRequestURL() + getShareUrl());

    isCopyButtonClicked.value = true;

    setTimeout(() => {
        isCopyButtonClicked.value = false;
    }, 2000);
}
</script>

<style scoped></style>

