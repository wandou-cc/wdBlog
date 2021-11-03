import Vue from 'vue'

function changeStr (str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireComponent = require.context('./',false,/\.vue$/); // './'操作对象为当前目录

requireComponent.keys().forEach(element => {
    const config = requireComponent(element);

    const componentName = changeStr(
        element.replace(/^\.\//,'').replace(/\.\w+$/,'')
    )
    
    Vue.component(componentName, config.default || config)
});