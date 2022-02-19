function car(xx, yy, width, height, wheelSize, wheelYoffset, wheelSep, renderObj) {
    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint;

    var group = Body.nextGroup(true),
        wheelBase = 20,
        wheelSep = wheelSep || width * 0.5,
        wheelAOffset = -wheelSep + wheelBase,
        wheelBOffset = wheelSep - wheelBase,
        wheelYOffset = wheelYoffset || 0;

    var renderObj = renderObj || {
    }
    renderObj.sprite = {
        texture: './img/car.png'
    }

    var car = Composite.create({ label: 'Car' }),
        body = Bodies.rectangle(xx, yy, width, height, { 
            collisionFilter: {
                group: group
            },
            render: renderObj,
            chamfer: {
                radius: height * 0.5
            },
            density: 0.0002
        });

    var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
        collisionFilter: {
            group: group
        },
        render: {
            sprite: {
                texture: './img/wheel1.png'
            }
        },
        friction: 0.8
    });
                
    var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
        collisionFilter: {
            group: group
        },
        render: {
            sprite: {
                texture: './img/wheel1.png'
            }
        },
        friction: 0.8
    });
                
    var axelA = Constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        length: 0
    });
                    
    var axelB = Constraint.create({
        bodyB: body,
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 1,
        length: 0
    });
    
    Composite.addBody(car, body);
    Composite.addBody(car, wheelA);
    Composite.addBody(car, wheelB);
    Composite.addConstraint(car, axelA);
    Composite.addConstraint(car, axelB);

    return car;
};
