const
	VERSION="0.1",
	FPS=30,
	MSPF=Math.ceil(1000/FPS),
	SCREEN_WIDTH=320,
	SCREEN_HEIGHT=200,
	STORAGE_PREFIX="PVPX2-",

	// Credits
	FOOTERCREDITS=["Remix Retro PVP "+VERSION+" - (c)2022","RemixWorlds.com"];
	FOOTERHTMLCREDITS="Remix Retro PVP "+VERSION+" &dash; &copy;2022 &dash; <a target=_blank href='https://play.remixworlds.com'>RemixWorlds Dashboard</a> &dash; <a target=_blank href='https://waxio.io/'>WAX Gaming Dashboard</a>";
	FULLCREDITS=[
		{color:"RED",text:"Remix Retro PVP"},
		
		
		{small:true,color:"BLACK",text:"RemixWorlds.com"}
	],

	// Font custom symbols
	HEALTH_SYMBOL=String.fromCharCode(176),
	TIME_SYMBOL=String.fromCharCode(177),
	AMMO_SYMBOL=String.fromCharCode(178),
	VICTORY_SYMBOL=String.fromCharCode(179),
	FLAG_SYMBOL=String.fromCharCode(180),
	LIVES_SYMBOL=String.fromCharCode(181),
	DOT_SYMBOL=String.fromCharCode(182),
	INFINITE_SYMBOL=String.fromCharCode(183),
	SUICIDE_SYMBOL=String.fromCharCode(185),
	FRAG_SYMBOL=String.fromCharCode(186),
	LEFTARROW_SYMBOL=String.fromCharCode(187),
	RIGHTARROW_SYMBOL=String.fromCharCode(188),
	TELEPORT_SYMBOL=String.fromCharCode(196),
	DRONE_SYMBOL=String.fromCharCode(197),

	// Radar symbols
	RADAR_DRONE=125,
	RADAR_FLAG=129,
	RADAR_HOTSPOT=133,
	RADAR_PLAYER=137,

	// Radar range
	RADARRANGE_UNLIMITED=1000,

	// Calculated
	HSCREEN_WIDTH=Math.floor(SCREEN_WIDTH/2),
	HSCREEN_HEIGHT=Math.floor(SCREEN_HEIGHT/2),

	// Color palette - https://lospec.com/palette-list/na16
	PALETTE={
		LIGHTBLUE: [140,143,174], // #8c8fae
		PURPLE:[88,69,99], // #584563
		DARKPURPLE:[62,33,55], // #3e2137
		BROWN:[154,99,72], // #9a6348
		LIGHTPINK:[215,155,125], // #d79b7d
		WHITE:[245,237,186], // #f5edba
		YELLOW:[192,199,65], // #c0c741
		GREEN:[100,125,52], // #647d34
		ORANGE:[228,148,58], // #e4943a
		RED:[157,48,59], // #9d303b
		PINK:[210,100,113], // #d26471
		LIGHTPURPLE:[112,55,127], // #70377f
		CYAN:[126,196,193], // #7ec4c1
		BLUE:[52,133,157], // #34859d
		DARKGREEN:[23,67,75], // #17434b
		BLACK:[31,14,28] // #1f0e1c
	},
	PALETTEINDEX=[
		"LIGHTBLUE",
		"PURPLE",
		"DARKPURPLE",
		"BROWN",
		"LIGHTPINK",
		"WHITE",
		"YELLOW",
		"GREEN",
		"ORANGE",
		"RED",
		"PINK",
		"LIGHTPURPLE",
		"CYAN",
		"BLUE",
		"DARKGREEN",
		"BLACK"
	];

	// Announcer levels
	ANNOUNCER_GAMEPLAY=1,
	ANNOUNCER_KILLS=2,
	ANNOUNCER_GAMEMODEFLOW=3,
	ANNOUNCER_MATCHFLOW=4,

	// Game modes constants
	DRONES_MAXCOUNT=30,

	// Default lights
	LIGHTS={
		primary:{
			tint:2
		},
		secondary:{
			tint:1
		},
		player:{
			tint:100,
			light:1.2
		}
	},

	// Trigger types
	TRIGGERS={
		openDoor:1,
		pickObject:2,
		spark:3,
		bullet:4,
		projectile:5,
		gibs:6
	},

	// Raycaster defaults
	RAYCASTER_DEFAULTS={
		tintBase:0.2,
		tintRamp:0.4,
		overallLight:1,
		overallTint:1,
		skyboxTint:1,
		skyboxLight:1,
		floorLight:1.1,
		floorTint:1,
		ceilingLight:0.95,
		ceilingTint:1,
		wallLight:1,
		wallTint:1,
		wallCornerLight:0.75,
		wallCornerTint:1,
		spritesLight:1,
		spritesTint:1,
		shadowLight:0.86,
		shadowTint:1
	},
	
	// Font
	FONTPALETTE={
		BLACK:0,
		BLUE:1,
		GREEN:2,
		CYAN:3,
		RED:4,
		PURPLE:5,
		YELLOW:6,
		WHITE:7
	};

// Game managers
var MAINMENU,GAME,CONTROLSSETTINGSMENU,SETUPGAME,SETTINGS,CREDITS,GAMESTATE,CONTROLSEXPLAIN,BENCHMARK;

// Globals helpers
var TRIGO,RC,TRANSITION,DOM,SPRITE,MAPLOADER,CANVAS,QMATH,KEYMENU;

// Textures/sprites/fonts
var SOLDIERTEXTURES,WALLTEXTURES,SKYBOXES,SPRITETEXTURES,HUD,FONT,FONTSMALL,STATICGENERATOR;

// Sprites
var WEAPONSSPRITES;

// Songs
var SONGS;

// Player data
var PLAYERSDATA;

// Configuration
var CONFIG,DEFAULT_CONFIGS={};

function Data()  {
	this.initialize=function() {
		SONGS=[];
		AUDIOPLAYER.resources.forEach(audio=>{
			if (audio.isSong) SONGS.push(audio);
		});
		PLAYERSDATA=[{
			fontColor:FONTPALETTE.RED,
			color:PALETTE.RED,
			label:"RED",
			textures:RayCaster.recolorTextures(SOLDIERTEXTURES,[
				{ from:PALETTE.GREEN, to:PALETTE.PINK },
				{ from:PALETTE.DARKGREEN, to:PALETTE.RED }
			])
		},
		{
			fontColor:FONTPALETTE.BLUE,
			color:PALETTE.BLUE,
			label:"BLUE",
			textures:RayCaster.recolorTextures(SOLDIERTEXTURES,[
				{ from:PALETTE.GREEN, to:PALETTE.CYAN },
				{ from:PALETTE.DARKGREEN, to:PALETTE.BLUE }
			])
		},
		{
			fontColor:FONTPALETTE.GREEN,
			color:PALETTE.GREEN,
			label:"GREEN",
			textures:SOLDIERTEXTURES
		},
		{
			fontColor:FONTPALETTE.YELLOW,
			color:PALETTE.YELLOW,
			label:"YELLOW",
			textures:RayCaster.recolorTextures(SOLDIERTEXTURES,[
				{ from:PALETTE.GREEN, to:PALETTE.YELLOW },
				{ from:PALETTE.DARKGREEN, to:PALETTE.ORANGE }
			])
		}]
	}
}