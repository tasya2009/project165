AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var p1 = new THREE.Vector3();
            var p2 = new THREE.Vector3();

            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            player.getWorldDirection(p1);
            enemy.getWorldDirection(p2);


            //set the velocity and it's direction
            var direction = new THREE.Vector3();
            direction.subVectors(p1, p2).normalize();
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));
            
            //Set dynamic-body attribute
            enemyBulletBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
              });

            //Get text attribute
            var element = document.querySelector("#countLife");
            var life = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if(life > 0){
                        life = life-1;
                        element.setAttribute("text", {value:life});
                    }
                    else{
                        var x = document.querySelector("#over");
                        x.setAttribute("visible", true);
                        var tanks = document.querySelectorAll(".enemy");
                        for (var i = 0; i < tanks.length; i++){
                            scene.removeChild(tanks[i]);
                        }
                    }

                }
            });

        }
    },

});