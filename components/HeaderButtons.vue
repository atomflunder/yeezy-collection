<template>
    <client-only>
        <template #fallback>
            <USkeleton class="h-12 p-4" />
        </template>

        <div class="h-12 p-4">
            <div class="float-left">
                <slot name="actionButtons"></slot>
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

