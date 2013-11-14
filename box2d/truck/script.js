var world, bodies = [];

function Start() {
	var b2Vec2         = Box2D.Common.Math.b2Vec2,
		b2BodyDef      = Box2D.Dynamics.b2BodyDef,
	    b2Body         = Box2D.Dynamics.b2Body,
	    b2FixtureDef   = Box2D.Dynamics.b2FixtureDef,
	    b2Fixture      = Box2D.Dynamics.b2Fixture,
	    b2World        = Box2D.Dynamics.b2World,
	    b2MassData     = Box2D.Collision.Shapes.b2MassData,
	    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	    b2CircleShape  = Box2D.Collision.Shapes.b2CircleShape,
	    b2DebugDraw    = Box2D.Dynamics.b2DebugDraw,
		b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
		b2WeldJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
		
	world = new b2World(new b2Vec2(0, 10), true);
	
	var fixDef = new b2FixtureDef();
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	
	var bodyDef = new b2BodyDef();
	
	// create ground
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(20,2);
	bodyDef.position.Set(10, 400 / 30 + 1.8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(10, -1.8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixDef.shape.SetAsBox(2, 14);
	bodyDef.position.Set(-1.8, 13);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(21.8, 13);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	// Create objects
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.5, 0.5);
	bodyDef.position.x = 7.5;
	bodyDef.position.y = 15;
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(1.0);
	bodyDef.position.x = 5;
	bodyDef.position.y = 5;
	var wheel1 = world.CreateBody(bodyDef);
	wheel1.CreateFixture(fixDef);
	//
	
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(1.0);
	bodyDef.position.x = 7;
	bodyDef.position.y = 10;
	var wheel2 = world.CreateBody(bodyDef);
	wheel2.CreateFixture(fixDef);
	
	var joint = new b2RevoluteJointDef();
	joint.Initialize(wheel1, wheel2, wheel1.GetWorldCenter());
	world.CreateJoint(joint);
	
	// Debug draw
	var debugDraw = new Box2D.Dynamics.b2DebugDraw;
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(30.0);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	window.setInterval(update, 1000 / 60);
	
	function update() {
		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();
	}
	
	window.onkeydown = function (e) {
	    var code = e.keyCode ? e.keyCode : e.which;
	    if (code === 37) { //left key
	        wheel1.ApplyImpulse(new b2Vec2(-10.0, 0), wheel1.GetWorldCenter());
	    } else if (code === 39) { //right key
	        wheel1.ApplyImpulse(new b2Vec2(5.0, 0), wheel1.GetWorldCenter());
	    }
	};
}

Start();
