function car(xx, yy, width, height, wheelSize, wheelYoffset, wheelSep, renderObj, path) {
    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint;

    var group = Body.nextGroup(true),
        wheelSep = wheelSep || width * 0.5,
        wheelAOffset = -wheelSep + 20,
        wheelBOffset = wheelSep,
        wheelYOffset = wheelYoffset || 0;

    var renderObj = renderObj || {sprite : { texture: './img/car.png' }}

    var path = "0 20 120 5 170 0 300 45 290 65 40 70 5 60";
    var vertex = Vertices.fromPath(path);
    
    var body = Bodies.fromVertices(width/2, height/2, vertex, {
        collisionFilter: {
            group: group
        },
        render: renderObj,
        chamfer: {
            radius: height * 0.5
        },
        density: 0.0002
    }, true);


    var car = Composite.create({ label: 'Car' })

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
