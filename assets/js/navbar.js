export function toggle() {
    const expandedClass = "expanded"

    var navbar = document.getElementById("mainNav");
    var drawerBtn = document.getElementById("drawerIcon");

    if (!navbar.className.includes(expandedClass)) {
        navbar.className = `${navbar.className} ${expandedClass}`;
        drawerBtn.className = "fa fa-close";
    } else {
        navbar.className = navbar.className.replace(expandedClass, '');
        drawerBtn.className = "fa fa-bars";
    }
}