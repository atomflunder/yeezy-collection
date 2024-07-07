<template>
    <client-only>
        <template #fallback>
            <USkeleton class="h-12" />
        </template>

        <div class="h-12">
            <UButton
                :icon="
                    isCopyButtonClicked
                        ? 'i-mdi-clipboard-check-multiple-outline'
                        : 'i-mdi-clipboard-multiple-outline'
                "
                :label="
                    isCopyButtonClicked
                        ? 'Copied to Clipboard'
                        : 'Share Collection'
                "
                @click="copyShareUrl()"
            />
            <UButton
                icon="i-mdi-open-in-new"
                label="View Collection"
                :to="'/' + getShareUrl()"
                target="_blank"
            />

            <UButton
                icon="i-mdi-github"
                label="Visit my GitHub!"
                to="/github"
                target="_blank"
                class="float-right invisible md:visible"
                color="white"
                variant="link"
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

