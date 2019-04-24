<template>
    <div id="app">
        <header id="app-header">
            <img src="./assets/logo.png">
            <h1>Charts Manager</h1>
        </header>
        <div id="app-contents">
            <main id="app-main">
                <router-view/>
            </main>
            <footer id="app-footer">
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
body {
    margin: 0 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    position: relative;
    width: 100%;
}

#app-header {
    box-shadow: 0 5px 8px 2px #eaeaea;
    display: block;
    height: 90px;
    position: fixed;
    top: 0;
    width: 100%;
}

#app-header img {
    height: 80px;
    position: fixed;
    top: 10px;
    left: 10px;
}

#app-contents {
    position: fixed;
    top: 80px;
    width: 100%;
}

#app-main {
    width: 100%;
}
</style>
