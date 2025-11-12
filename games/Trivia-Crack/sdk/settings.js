TGH5.settings = {
	"logging": {
		"enabled": false,
		"level": 4,
		"console": "overlay"
	},
	"storageType": "auto",
	"languages": [
		"en",
		"fr",
		"de",
		"es",
		"it"
	],
	"keyCodeScheme": "lg",
	"defaultUserName": "GUEST",
	"inactivityTime" : {
		"default": 120000,
		"video-channel": 3600000
	},
	"googlePALSDK": {
		"enabled": true,
		"url" : "media/pal_sdk.html"
	},
	"mediaFormats": {
		"audio": [
			{
				"ext": ".mp4",
				"mimeType": "audio/mp4"
			},
			{
				"ext": ".mp3",
				"mimeType": "audio/mpeg"
			},
			{
				"ext": ".mp3",
				"mimeType": "audio/mp3"
			}
		],
		"audioContext": [
			{
				"ext": ".wav",
				"mimeType": "audio/wav"
			}
		],
		"video": [
			{
				"ext": ".mp4",
				"mimeType": "video/mp4"
			}
		]
	},
	"socialManager": {
		"enabled": false
	},
	"audioManager": {
		"engines": [
			"AudioContext",
			"AudioSprite",
			"AudioTag"
		],
		"sound": {
			"enabled": true
		},
		"music": {
			"enabled": true,
			"tracks": {
				"dreamypiano": "media/music/MusicBakery_DreamyPiano",
				"technologyfantasy": "media/music/MusicBakery_TechnologyFantasy",
				"toyboxes": "media/music/MusicBakery_Toy_Boxes",
				"bittersweet": "media/music/BitterSweet",
				"folkguitars": "media/music/FolkGuitars",
				"wistful": "media/music/Wistful",
				"hyperspaceracers": "media/music/HyperspaceRacers",
				"asainsunrise": "media/music/AsainSunrise",
				"cowboystrut": "media/music/CowboyStrut",
				"littlefriends": "media/music/LittleFriends",
				"korbejinky08": "media/music/Korbejinky08",
				"marathon": "media/music/Marathon",
				"ambfinaltable": "media/music/amb_final_table",
				"ambient_corporation": "media/music/ambient_corporation",
				"level": "media/music/level",
				"travel_to_egiped": "media/music/travel_to_egiped",
				"too_cool": "media/music/too_cool",
				"rummikub_music": "media/music/rummikub_music",
				"texttwist_music": "media/music/texttwist_music",
				"tomb_runner": "media/music/tomb_runner",
				"yeti_music": "media/music/yeti_music",
				"doodle_jump": "media/music/doodle_jump",
				"letter_sensei": "media/music/letter_sensei",
				"crossy_road": "media/music/crossy_road",
				"puppy_rescue": "media/music/puppy_rescue",
				"word_sensei": "media/music/word_sensei",
				"tripoly": "media/music/tripoly",
				"banana_jungle": "media/music/banana_jungle",
				"strike": "media/music/strike",
				"carrot_mania": "media/music/carrot_mania",
				"nine_ball_pool": "media/music/pool_ball",
				"endless_truck": "media/music/endless_truck",
				"one_vs_hundred": "media/music/one_vs_hundred",
				"dond": "media/music/dond",
				"alice_hearts": "media/music/alice_hearts",
				"soccer": "media/music/soccer",
				"footchinko": "media/music/footchinko",
				"blackjack": "media/music/blackjack",
				"chess": "media/music/chess",
				"road_fury": "media/music/road_fury",
				"color_pin": "media/music/color_pin",
				"dj_christmas": "media/music/dj_christmas",
				"ks_halloween": "media/music/ks_halloween",
				"pool_club": "media/music/pool_club",
				"qs_sports": "media/music/qs_sports",
				"super_maze": "media/music/super_maze",
				"math_time": "media/music/math_time",
				"star_jam": "media/music/star_jam",
				"crossy_word": "media/music/crossy_word",
				"dino_jump": "media/music/dino_jump",
				"backgammon": "media/music/backgammon",
				"pumpkin_run": "media/music/pumpkin_run",
				"back_out": "media/music/back_out",
				"unroll_ball": "media/music/unroll_ball",
				"santa_quest": "media/music/santa_quest",
				"santa_maze": "media/music/santa_maze",
				"link": "media/music/link",
				"maze_worlds": "media/music/super_maze",
				"rider": "media/music/rider",
				"sort_it": "media/music/sort_it",
				"pp_time_traveler": "media/music/pp_time_traveler",
				"pongoal": "media/music/pongoal",
				"hatchimals": "media/music/hatchimals",
				"hexa_blocks": "media/music/hexa_blocks",
				"ono": "media/music/ono",
				"dots": "media/music/dots",
				"fantasy_10x10": "media/music/fantasy_10x10",
				"lol_surprise": "media/music/lol_surprise",
				"racer": "media/music/racer",
				"knife_smash": "media/music/knife_smash",
				"dino_square": "media/music/dino_square",
				"centipede": "media/music/centipede",
				"connect4": "media/music/connect4",
				"trivia_crack_menu": "media/music/trivia_crack_menu",
				"trivia_crack_classic": "media/music/trivia_crack_classic",
				"trivia_crack_challenge": "media/music/trivia_crack_challenge",
				"trivia_crack_party": "media/music/trivia_crack_party"
			},
			"defaultTrack": "wistful"
		},
		"settings": {
			"loopSupported": window.navigator.userAgent.indexOf("IP100")>0?false:true,
			"firstPauseAfterSecondOfPlaying": false,
			"loadBeforePlay": true,
			"postPlayTime": 500,
			"prePlayTime": 0,
			"seekTimeOutInsteadOfEventIfNotMP3": -1,
			"seekTimeOutInsteadOfEventIfMP3": -1,
			"waitForCanPlayAfterSeekedEventIfNotMP3": false,
			"waitForCanPlayAfterSeekedEventIfMP3": false,
			"stopMusicImmediately": false
		}
	},
	"screenResolution": {
		"width": 1280,
		"height": 720
	},
	"adsSettings": {
		"showWrongInputIcon": true,
		"skipAdAllowed": true,
		"disableLoadingBar": true,
		"adsVideoFrequency": {
			"mid-roll": 0,
		},
		"detectAdBlock": {
			"enabled": false,
			"url": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
		},
		"ads": {
			"pre-roll": false,
			"mid-roll": [],
			"post-roll": false,
			"rewarded": []
		},
		"adVendors": {
			"poki_midroll": {
				"className": "PokiAd",
				"type": "commercial"
			},
			"poki_rewarded": {
				"className": "PokiAd",
				"type": "rewarded"
			}
		}

	},
	"resourceManager": {
		"loadingTimeout": 15000,
		"attemptsCount": 3,
		"parallelLoads": 3,
		"parallelUnloads": 400,
		"postImageDelay": 50,
		"postFontDelay": 50,
		"postDelay": 1500,
		"popupMinDisplayTime": 3000,
		"loadImmediatelyTimeout": 500,
		"supportedImages": [
			{
				"ext": ".jpg",
				"group": 0
			},
			{
				"ext": ".png",
				"group": 1
			}
		],
		"supportedFonts": [
			{
				"ext": ".ttf",
				"group": -1
			}
		],
		"loadingUpdateInterval": 50,
		"disableImageCache": true
	},
	"paymentManager": {
		enabled: false,
		adsAllowed: true,
		supportURL: "www.play.works/support",
		localization: {
			"day": {"en": "day", "ru": "день"},
			"days": {"en": "days", "ru": "дней"},
			"month": {"en": "month", "ru": "месяц"},
			"months": {"en": "months", "ru": "месяцев"},
		},
		providers: {
			"defaultProvider": "xsolla",
			"xsolla": {
				className: "Playworks",
				host: "https://payment.play.works:8081",
				supportURL: "help.xsolla.com",
				checkoutDialog: {
					template: '<div style="width: 1040px; height: 470px; position: fixed; top: 125px; left: 120px; background-color: #f1f3f4; border-radius: 4px; border: solid 1px #CCC; font-family: Archivo, Xscale, Arial, Archivo Narrow, sans-serif, monospace;">' +
						'<div style="color: #1264a3; font-size: 40px; top: 30px; text-align: center; position: absolute; width: 1040px;">{{product.name}}<span style="color:#606060;">*</span></div>' +
						'<img style="position:absolute; top:100px; left:210px;" src="{{qrDataURI}}"/ >' +
						'<div style="text-align: center; position:absolute; width: 400px; color:#606060; font-size: 30px; top: 132px; left: 485px; ">{{toPay}}</div>' +
						'<img style="position:absolute; top: 134px; left: 445px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABVCAMAAAA45ZdcAAAAhFBMVEUAAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGDk2QwFAAAAK3RSTlMAXF+lv6yhl0BkJU2bQ8SKdlRJKmrocds6II+B9n0wEATu4rQ20roYzIUIfzRfrgAAA6tJREFUWMOVlgmWqjAQRaMyh1lGGRQF1H77398nUTogNN+8E0IY7klVpSpABpk3t3cVRXGH5g6NjVnXK8pN6RPyKR3bsslcCa4+pcaeBmEQGMbOyIyQUhrud5QGQVhdoZOpMuBOtvRzRT29NqGKi1zpbsrj4T76VtxUsZsCe1Tiom5KvETFTRvmHLDJtg6I5iZ57GRFzypKKt/3IzNJIr/ynknhHzkwn2GHA3d9VdxdbQ4E0IZIxNCNLAwzxzFYC53QyJz2hObOZtjPZ9CH6KAna7qxd7VPwGbAYd3fVUBjgLoK8CXQVk3S5IAjs8s6Hfx8TBhVj+4DwN61V4CadQ90+pm8dDy48Dmw7gMH0ich2cWwiLPfBzlxiw2Am5RGpIAL6oCp1jzuw/o6WCys5tkHEA9U3JVIHIfPsAGwR4NCH2UJJIT8H7gfYsCrcI2/Arh690LBFHwDXNo6C3MSev0zvHwDVEAJWERnJfMNoCBOgX2AsvHP3wAu2BQdUJUzp3eL9D6y1cvOD5Rlg0JHAyR1NibfX4BrFGCySAog0zxh0joQRyRITokxpFZitkQptkxiPnQ4RJdxR/NV+KIe1oH2oNpjPbSqqtUcWJlBf5m0kIgSlQNsmAuTNgEdtwVg/QHcmPknIFqapG/tGkA2BU5/AweYrOsQ/8wBa2sjs9EGUL6L0g0BM4mSHtUMaOGtAhrMl13nBuE0SjX6P0wy38lnoDlPgDuQDxVK3sfQ8XZOcRy3Sh+ucJrHOr3G6XBch2MYxNfhErDJbz3cUAgfCKkaLFU+f7hdwdD/urF/B+inturj0XrpeMzz3Doyq0W2hrgKYEs2kjEEPgcKsi19BDI+xW4xQ2D793l+BL8j+grrVHe+14gKmFZcgNsYVqEUqlkAgph82M9lc/n816B8SzM4IQAxzIgJfW6wwf0TxHQT8OGTYP5NL94v1gAVdTr9udrBm/mM2OIDB2N+aqJCWV1EH7VTIT2/FxZ0LDvhocL8y2eEORIUcAj/08kF0DNHmpPpRzSKaJLszSho0P3O8QyLeJIKlJeqh4WU8fmg6ToZcPmp8jzvNLQn76vKHQPRenphkAWwVAyHrMmBsg4Y6NbvC2D57yYH5OjkAJKilQNUJHKAD08OyKDJAWfc5IBLGV+kAJLCkgMeyGSBUA5QEckBe+gS2TroB40lBZAdUksKICeUoRRACiCQAogHVQ5wcJADdrJABF0OMD+LgsLdBOin0y06sqmCfhoZ/AP2LoKbYbqZugAAAABJRU5ErkJggg==" alt="" />' +
						'<div class="pwbtn" style="position: absolute; width: 180px; height: 40px; border: solid 2px #1264a3; border-radius: 3px;' +
						'            text-align: center; background-color: #d2deea; font-size: 20px; color: #1264a3; line-height: 40px; top:217px;left: 593px;">{{btn}}</div>' +
						'<div style="color: #1264a3; font-size: 34px; top: 330px; text-align: center; position: absolute; width: 1040px;">{{text1}}</div>' +
						'<div style="background-color: #dae7f1; height: 3px; position:absolute; width: 1040px; top: 400px;"></div>' +
						'<div style="text-align: center; position:absolute; width: 1040px; color:#606060; font-size: 18px; top: 406px; left: 0; line-height: 20px;">{{taxText}}</br>{{text2}} <span style="color: #1264a3">help.xsolla.com</span></br>{{text3}} ' +
						'<span style="color: #1264a3">www.play.works/terms/payments</span></div></div>',
					btn: {
						'en': "CANCEL"
					},
					toPay: {
						'en': 'To make a purchase</br>Please scan this QR code'
					},
					text1: {
						'en': 'Please keep this screen open until payment is approved'
					},
					text2: {
						'en': 'In case for any issues with checkout, please contact'
					},
					text3: {
						'en': 'For product description and terms & conditions, please go to'
					},
					taxText: {
						'en': '*Additional Local Tax Rate will be applied in the final billing information.'
					}
				},
				congratulationDialog: {
					template: '<div style="width: 1040px; height: 470px; position: fixed; top: 125px; left: 120px; background-color: #f1f3f4; border-radius: 4px; border: solid 1px #CCC; font-family: Archivo, Xscale, Arial, Archivo Narrow, sans-serif, monospace;">' +
						'<table style="height: 280px; margin-top: 10px">' +
						'<tr><td><div style="color: #1264a3; font-size: 40px; margin-top: 30px; text-align: center; width: 1040px;">{{product.name}}<span style="color:#606060;">*</span></div></td></tr>' +
						'<tr><td style="text-align:center"><img style="left: 490px; top:108px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAMAAADy+wKBAAABWVBMVEUAAAAyxnEyxnExx3EvymkxxnAyx3Axx3EwyW8xyHAwyG4xyHMyxnIxxnAyx3Exx3Axx3Axx28vym8yxXIxyXYwyXA4wIEzxXEvym4xx3ExyHIxyG4yx28xyG4yyHAr0G4uy2Yrz10vyW42wnUyxnEyxnAxxnAvyWwyx3Evymsxx3Ixx3QuyW4vyWso0Wkxx3Iszlsk10YzxXAzxnQyxnIzxW4yxnEuyWkxx3A0xG43v3kwyG0V6DEQ7Tcl1XMP7x8Y5j8yxnH///8zxnI1x3QyxnIDuVAXv19g05EyxXE5yHY3x3QLu1YzxHQ0xHMwx2/L8dsrxGzx+/Yow2oPvVnv+/ST4bU2wnYcwGI2wXoTvlwKu1WG3qw4v34hwmXy/PZ726RMzYM8yXj7/vzz/Pbs+vLN8d3K8Nt/3Kdb0o4IulPX9OPA7dS268yp58OM369x2J1w15w0xHh6gzPrAAAAQXRSTlMA7PPaBPDLnIpsVTjo4uDVz4Z3PRsI+N+qqIFwYEEwKCMN6+bewr+wn5uTiGRaTEtFMxP59/b19ebZycFHNzQmGoYlScEAAAK0SURBVEjHjdZpV5tAFIDhS/bVJGrd932v2n3vBSbpaCBGsVlqUrWtW/f+/w9FCYGJwMz7LefMkwucgTPg3UxqbDS2IIWkvthoYXMahEuv59GVQjCXGBCBkY0Y9kYoxXzyAY8mh5GiVwQz44FyII8BkdxDf1pATnTNR+6+IshLiQ160el5gvxoNH2f7gwRFIk0Jnvpu1YNxdIqOyydlVoVQVuhQ+w9v2w4lBt94aYJjaJ4hKw69K1NRbG23bXDNhVNm7PpBhECFdcjqfV3bFTE7rebzSaqaEUfWW/VhAhVjfNfP/8a1S62BoepAP10/k2W5ZNiF2du6RSK0L2vJmXwpGkTRIQeyrKNFbxNWTFtmAhNtbsyLKvPAQyKTP0sO53V0WoKNnUeLTNUPi2jNTgJCV2IOp238S5lFUaoa91RqY5KLz1k6HXTftBLECPO1ilVr8+aVTWIfigq9p+Hoc+97rss/745UoOoc10SSM469Vg2+1i0MI9iCKIMtXEQdazUoSWb2tiPOta+36OqudcZzKMoQd76Xb6SZQbvlfeOA6kShmVrbxh/ZAbfFPeDKdJF+zWq1i+ZpadtDkUSt78aar10wCz+wqFIx2EGaWdTsdiPOqUB+ggyWJRKALCG6GBxqo2YNk1c+EKUor4FZlk3PhCkGLWONrZ1MJ/SsTsbecJiEYpkFu7qp8hgPq3o69Apgwy+4E7VnkVsO0kJO5lD8V8KusVr7OTLYKotg6twrcLgH+aG9qMVbT7itu+HGm5cb5+enBk+U2uNaWB6U9PQSa0aRl31pnrrNfS03VJQqEbK4/z7VBeQFD3PwTM5nfCoMjwF3sUVyqEj/gf/VFYJkCQzAQE9GIv6yseFWQhut38Bkdyn2cIgCLS1kmUnKs9HUxEQLZ2ML+WkUCgkhRfj4wPe8D9T/MFOfQeXqgAAAABJRU5ErkJggg=="/></td></tr>' +
						'<tr><td><div style="text-align: center; width: 1040px; color:#606060; font-size: 30px; top: 192px; left: 0; ">{{text1}}</div></td></tr>' +
						'<tr><td><div style="text-align: center; width: 1040px; color:#606060; font-size: 18px; top: 250px; left: 0; ">{{text2}}</div></td></tr></table>' +
						'<div class="pwbtn" style="position: absolute; width: 225px; height: 52px; border: solid 2px #1264a3; border-radius: 3px; text-align: center; background-color: #d2deea; font-size: 20px; color: #1264a3; line-height: 52px; top:307px;left: 407px;">{{btn}}</div>' +
						'<div style="background-color: #dae7f1; height: 3px; position:absolute; width: 1040px; top: 400px;"></div>' +
						'<div style="text-align: center; position:absolute; width: 1040px; color:#606060; font-size: 18px; top: 427px; left: 0; line-height: 20px;">{{taxText}}</div></div>',
					btn: {
						'en': "BACK TO GAME"
					},
					text1: {
						'en': 'Your payment was completed successfully'
					},
					text2: {
						'en': 'Thanks you for your purchase!'
					},
					taxText: {
						'en': '*Additional Local Tax Rate will be applied in the final billing information.'
					}
				},
				unsubscribeDialog: {
					template: '<div style="width: 1040px; height: 470px; position: fixed; top: 125px; left: 120px; background-color: #f1f3f4; border-radius: 4px; border: solid 1px #CCC; font-family: Archivo, Xscale, Arial, Archivo Narrow, sans-serif, monospace;">' +
						'<div style="color: #1264a3; font-size: 40px; top: 30px; text-align: center; position: absolute; width: 1040px;">{{title}}</div>' +
						'<img style="position:absolute; left: 490px; top:126px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAMAAADy+wKBAAABWVBMVEUAAAAyxnEyxnExx3EvymkxxnAyx3Axx3EwyW8xyHAwyG4xyHMyxnIxxnAyx3Exx3Axx3Axx28vym8yxXIxyXYwyXA4wIEzxXEvym4xx3ExyHIxyG4yx28xyG4yyHAr0G4uy2Yrz10vyW42wnUyxnEyxnAxxnAvyWwyx3Evymsxx3Ixx3QuyW4vyWso0Wkxx3Iszlsk10YzxXAzxnQyxnIzxW4yxnEuyWkxx3A0xG43v3kwyG0V6DEQ7Tcl1XMP7x8Y5j8yxnH///8zxnI1x3QyxnIDuVAXv19g05EyxXE5yHY3x3QLu1YzxHQ0xHMwx2/L8dsrxGzx+/Yow2oPvVnv+/ST4bU2wnYcwGI2wXoTvlwKu1WG3qw4v34hwmXy/PZ726RMzYM8yXj7/vzz/Pbs+vLN8d3K8Nt/3Kdb0o4IulPX9OPA7dS268yp58OM369x2J1w15w0xHh6gzPrAAAAQXRSTlMA7PPaBPDLnIpsVTjo4uDVz4Z3PRsI+N+qqIFwYEEwKCMN6+bewr+wn5uTiGRaTEtFMxP59/b19ebZycFHNzQmGoYlScEAAAK0SURBVEjHjdZpV5tAFIDhS/bVJGrd932v2n3vBSbpaCBGsVlqUrWtW/f+/w9FCYGJwMz7LefMkwucgTPg3UxqbDS2IIWkvthoYXMahEuv59GVQjCXGBCBkY0Y9kYoxXzyAY8mh5GiVwQz44FyII8BkdxDf1pATnTNR+6+IshLiQ160el5gvxoNH2f7gwRFIk0Jnvpu1YNxdIqOyydlVoVQVuhQ+w9v2w4lBt94aYJjaJ4hKw69K1NRbG23bXDNhVNm7PpBhECFdcjqfV3bFTE7rebzSaqaEUfWW/VhAhVjfNfP/8a1S62BoepAP10/k2W5ZNiF2du6RSK0L2vJmXwpGkTRIQeyrKNFbxNWTFtmAhNtbsyLKvPAQyKTP0sO53V0WoKNnUeLTNUPi2jNTgJCV2IOp238S5lFUaoa91RqY5KLz1k6HXTftBLECPO1ilVr8+aVTWIfigq9p+Hoc+97rss/745UoOoc10SSM469Vg2+1i0MI9iCKIMtXEQdazUoSWb2tiPOta+36OqudcZzKMoQd76Xb6SZQbvlfeOA6kShmVrbxh/ZAbfFPeDKdJF+zWq1i+ZpadtDkUSt78aar10wCz+wqFIx2EGaWdTsdiPOqUB+ggyWJRKALCG6GBxqo2YNk1c+EKUor4FZlk3PhCkGLWONrZ1MJ/SsTsbecJiEYpkFu7qp8hgPq3o69Apgwy+4E7VnkVsO0kJO5lD8V8KusVr7OTLYKotg6twrcLgH+aG9qMVbT7itu+HGm5cb5+enBk+U2uNaWB6U9PQSa0aRl31pnrrNfS03VJQqEbK4/z7VBeQFD3PwTM5nfCoMjwF3sUVyqEj/gf/VFYJkCQzAQE9GIv6yseFWQhut38Bkdyn2cIgCLS1kmUnKs9HUxEQLZ2ML+WkUCgkhRfj4wPe8D9T/MFOfQeXqgAAAABJRU5ErkJggg==" />' +
						'<div style="text-align: center; position:absolute; width: 1040px; color:#606060; font-size: 30px; top: 230px; left: 0; ">{{text1}}</div>' +
						'<div style="text-align: center; position:absolute; width: 1040px; color:#606060; font-size: 18px; top: 280px; left: 0; ">{{text2}}{{product.cancelationDate}}</div>' +
						'<div class="pwbtn" style="position: absolute; width: 225px; height: 52px; border: solid 2px #1264a3; border-radius: 3px;' +
						'           text-align: center; background-color: #d2deea; font-size: 20px; color: #1264a3; line-height: 52px; top:355px;left: 407px;">{{btn}}</div></div>',
					btn: {
						'en': "BACK TO GAME"
					},
					title: {
						'en': "Subscription Cancellation"
					},
					text1: {
						'en': 'Your subscription was cancelled'
					},
					text2: {
						'en': 'You will still be subscribed till '
					}

				},
				errorDialog: {
					template: '<div style="width: 1040px; height: 470px; position: fixed; top: 125px; left: 120px; background-color: #f1f3f4; border-radius: 4px; border: solid 1px #CCC; font-family: Archivo, Xscale, Arial, Archivo Narrow, sans-serif, monospace;">' +
						'<div style="color: #1264a3; font-size: 40px; top: 30px; text-align: center; position: absolute; width: 1040px;">{{title}}</div>' +
						'<img style="position:absolute; left: 490px; top:115px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAMAAADy+wKBAAABPlBMVEUAAADtGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7tGy7////tHTDuHjLrAA7sDiHrBBjtGSzsESXrARTtFyrqAAvtEyfsCBzqAAnqAAPsCx//9fbqAAf2hY/7w8j5tLr3k5zvMUL93uD8z9P6ub/1fon1eIP0c370b3ryWWfxTlzwQVDvKTv/+vv82Nz7zdH7yMz6vcP3m6TyU2LuJTb+7vD95uj81tr809b96Ov4rLP4qbH4paz4o6v2jJbzZ3TzZnHzYW7wRlbvOUgcUpFGAAAAMHRSTlMA8+nX0Qs844743V5EOfzurKJ2bFlSLCciFoeCf0wbD8fDwbu1sZqEZgUDyrOuljF7/Kj6AAAC/klEQVRIx8WX13LiMBRARTEtISEQEkjvbZtccbdD3dBCSG/b6///wNrEDpYwBj3teWF8mTOSbpEB+LOcX9mPhkOhUDi6l1hcAlPz4TACUVKJ9FTmzDb0I5qjJplHETiOcDbQTL+BQUTWx6uHcBIHx/5mcQdOJrLsW5YwnIZkbFRdCsEpmcXVAqIGg61MhSEBBcTdhiTEvWoCkvHOkydIyrBJIsRu6LX7ITmrjjsPMUpwYmRu029ZRuV0xWQ8EZZXdEVkIMLawI0iMVYTftdbDMcOI5Lcrv/UBBZ6mfdJMm/WaJp++su56zBS/6MVqcrmaGuuogcr12mbz7zoRGTpbBD5qqCHzowUSDWtRWzOOSciXbwEThkezRYFNiDq8q6r4C5r4iOxjhVDv6NtHkV3FVW4GkRq2J5h1jouCs/f2ItceHLVeLQiz1CDKPsgg0VYQezcVRoKM4xw/cpdW5ZY/NZ1qot2gqILLFJyXdF5dnQS42ggoCdx5pFmJp2l0H9y43AcJVlWZbkU4EZ946pgDaIkaIJkfQrimBvvLbTAB7hsNu5b35vVm2rzW+W8wZed8cXqu4KbvKH1fpxd0h4+1e9Nw8TtPZBHTdEQO9cvvX91W/tSu30+fdFbJYNH7TVQ8JpQF7r2HF022/d90TqsJIn9Xqdm+09ts1xi0OGPe7rRuLDn/LrzIBmcJsqylWpR4wzuoWsPyFXP0Dyduel5JzAmV7HNc6EsyAxSLaEs9arWd3VhKO/avxOgg6jeWrvtCobK+OS+zP2ydn42vDzywCLlPAgN60Z7QDKCZpFp0vQfzn2HH9tuzt0Z361oHGIisJJUaYmy85QANidJN8ucLrJwPKyqK6+Z3gADspCcA+AQJlbnKNedJXaPwCsLhOqOK5K/vZOU192YI3FjACFNoC66Enm+ZsAIsSTBqjjL0yQsHAO+nEwu1W4RjGMxuMNCORAAtRJw178vgmCKayn/gyYKYAryC2F8s5kZCkwJlc4tbKUG/8tSW5lsbBP48Q9uZQ+rV+DnFwAAAABJRU5ErkJggg=="/>' +
						'<div style="text-align: center; position:absolute; line-height:30px; width: 1040px; color:#606060; font-size: 18px; top: 212px; left: 0; ">{{text}} <span style="color: #1264a3">{{params.supportURL}}</span></div>' +
						'<div style="text-align: center; position:absolute; width: 1040px; color:#606060; font-size: 18px; top: 280px; left: 0; ">{{error}}</div>' +
						'<div class="pwbtn" style="position: absolute; width: 225px; height: 52px; border: solid 2px #1264a3; border-radius: 3px;' +
						'text-align: center; background-color: #d2deea; font-size: 20px; color: #1264a3; line-height: 52px; top:360px;left: 407px;">{{btn}}</div></div>',
					btn: {
						'en': "BACK TO GAME"
					},
					title: {
						'en': 'Payment Unsuccessful'
					},
					text: {
						'en': 'Processing your payment failed. Please try again later</br>For support, please contact'
					}

				},
			}
		}
	},
	"fitSettings": {
		"enabled": true,
		"fillByMinSide": false,
		"dynamicFit": true
	},
	"authorizationManager": {
		"enabled": false
	},
	"serviceAvailability": {
		"enabled": false,
		"allowedCountries": [],
		"screenBackground": "media/service_unavailable.jpg"
	},
	"geoManager": {
		"enabled": true,
		"defaultCountry": "uk",
		"providers": [
			{
				"className": "LaunchParam",
				"requestTimeout": 8000
			},
			{
				"className": "pwipify",
				"url": "https://ipify4.play.works/ip",
				"requestTimeout": 8000
			},
			{
				"className": "ipify",
				"url": "https://api.ipify.org?format=jsonp&callback=getIP_suc",
				"requestTimeout": 8000
			}
		]
	},
	"platform": "poki",
	"pokisdk": "https://game-cdn.poki.com/scripts/v2/poki-sdk.js",
	"isExitNotAvailable": true,
	"pwAnalytics" : {
		"enabled": false,
		"url": "https://analytics.play.works",
		"pingInterval": 30000,
		"inactivityTime": 120000
	},
	"reporting": {
		"enabled": false
	},
	"reportingGameAnalytics": {
		"enabled": false,
		"inactivityTimeout": 120,
		"infoLogEnabled": true,
		"analyticsScript": "https://download.gameanalytics.com/js/GameAnalytics-4.2.0.min.js"
	},
	"consent": {
		"url": "media/consent.html"
	},
	"gdpr": {
		"enabled": true,
		"url": "media/gdpr.html",
		"agreeLifeTime": 30,
		"disagreeLifeTime": 730,
		"allowedCountry": ["de"],
		"version": 2,
		"vendors": {
			"CMPId": 14,
			"CMPVersion": 1,
			"tcfPolicyVersion" : 2,
			"globalVendorListVersion": 90,
			"vendors":[231,458,790,553,151,264,565,410,793,23,780,733,354,960,610,335,128,869,672,156,285,378,77,630,91,126,929,350,262,755,98,61,253,10,333,452,49,838,804,109,776,228,79,807,69,164,384,140,444,762,860,226,76,81,60,36,71,351,261,73,82,45,115,531,104,165,293,230,42,475,102,202,336,44,52,21,28,162,26,25,512,7,744,32,469],
		},
	},

	'products': {
		"trivia_crack": {
			"productId": "trivia_crack",
			"title": "trivia_crack",
			"url": "../apps/trivia_crack11/index.html",
			"soundDisabled": false,
			"socialManagerDisabled": true,
			"renderEngine": "webgl",
			"renderSettings": {
			"webgl": {"resolutionWidth": 1280, "resolutionHeight": 720}
			},
			"lowEndSettings": {
				"enabled": false,
				"byPlatform": true
			},
			"dynamicLoading": false,
			"useEasyQuestion": {
				"enabled": true,
				"questionCount": 10,
				"languages": ['en_us', 'en_uk']
			},
			"type": "game",
			"useRAF": true,
			"banners": {
				"enabled": false
			}
		},
	}
}





