<template>
    <div id="app">
        <header id="app-header">
            <div id="app-logo-wrapper">
                <img id="app-logo" src="./assets/logo.png">
            </div>
            <h1 id="app-title">{{ appTitle }}</h1>
            <div id="app-navbar">
                <ul>
                    <li>
                        <router-link :to="'/'">Home</router-link>
                    </li>
                    <li>
                        <router-link :to="'/charts'">Charts</router-link>
                    </li>
                </ul>
            </div>
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
import { mapState } from 'vuex'

export default {
    name: 'App',
    computed: {
        ...mapState([
            'appTitle'
        ]),
    }     
}
</script>

<style>
body, html {
    height: 100%;
    margin: 0 0;
}

#app {
    align-items: stretch;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: 100%;
}

#app-header {
    background: #ffffff;
    box-shadow: 0 3px 8px 1px #eaeaea;
    display: flex;
    height: 90px;
    position: fixed;
    text-align: left;
    width: 100%;
    z-index: 50;
}

#app-logo-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
}

#app-logo {
    height: 40px;
}

#app-title {
    font-weight: 200;
    line-height: 90px;
    margin: 0 0;
    padding: 0 5px;
}

#app-navbar {
    position: absolute;
    height: 100%;
    padding-right: 15px;
    right: 0;
}

#app-navbar ul {
    display: flex;
    flex-direction: row;
    height: 100%;
    list-style-type: none;
    margin: 0 0;
    padding: 0 0;
    
}

#app-navbar ul li  {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    margin: 0 0;
    padding: 0 0;
}

#app-navbar ul li a {
    display: block;
    padding: 0px 8px;
    text-decoration: none;
}

#app-contents {
    flex: 1;
    padding-top: 90px;
    width: 100%;
    z-index: 40;
}

#app-main {
    height: 100%;
    width: 100%;
}

</style>
