<script lang="ts">
    import { onMount } from 'svelte';
  
    interface ToggleThemeProps {
      label?: string;
      className?: string;
      iconClass?: string;
    }
  
    export let label: ToggleThemeProps['label'] = 'Toggle between Dark and Light mode';
    export let className: ToggleThemeProps['className'] = 'inline-block rounded-lg p-2.5 text-sm text-gray-500 hover:bg-primary-100 hover:text-primary-500 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-primary-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700';
    export let iconClass: ToggleThemeProps['iconClass'] = 'w-6 h-6';
  
    let isDark = false;
  
    function toggleTheme(): void {
      isDark = !isDark;
    }
  
    onMount(() => {
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
  </script>
  
  <button data-aw-toggle-color-scheme type="button" class="{className}" aria-label="{label}" on:click="{toggleTheme}">
    <span class="{iconClass}">
    {#if isDark}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"/>
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"/>
        </svg>
    {/if}
  </span>
  </button>
  