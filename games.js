const juegos = [
  { name: "Level Devil", url: "https://leveldevil2.io/devil-level-2.embed", img: "assets/games/level-devil.webp", tags: ["arcade", "skill", "2players"] },
  { name: "Stick fighter", url: "https://labgstore21.github.io/g2/class-629/", img: "assets/games/stick-fighter.webp", tags: ["action", "skill", "2player"] },
  { name: "Suika Game", url: "https://suikagame.io/game/suika-game/", img: "assets/games/suika-game.webp", tags: ["puzzle", "skill", "merge"] },
  { name: "Merge Rot", url: "https://game.azgame.io/merge-brainrot/", img: "assets/games/merge-rot.webp", tags: ["merge", "puzzle"] },
  { name: "Stickman Hook", url: "https://ug17.github.io/play/Stickman-HookUB/", img: "assets/games/stickman-hook.webp", tags: ["skill", "arcade"] },
  { name: "Monkey Mart", url: "https://monkey-mart.io/iframe/index.html", img: "assets/games/monkey-mart.webp", tags: ["tycoon", "simulation"] },
  { name: "My perfect hotel", url: "https://1games.io/game/perfect-hotel/", img: "assets/games/my-perfect-hotel.webp", tags: ["tycoon", "simulation"] },
  { name: "Bascket random", url: "https://games-site.github.io/projects/basket-random/frame.html", img: "assets/games/bascket_random.webp", tags: ["arcade", "2player"] },
  { name: "Boxing random", url: "https://games-site.github.io/projects/boxing-random/frame.html", img: "assets/games/boxing_random.webp", tags: ["action", "2player"] },
  { name: "Soccer random", url: "https://games-site.github.io/projects/soccer-random/frame.html", img: "assets/games/soccer_random.webp", tags: ["2player", "skill"] },
  { name: "Volley random", url: "https://games-site.github.io/projects/volley-random/frame.html", img: "assets/games/volley-random.webp", tags: ["2player", "skill"] },
  { name: "Crossy Road", url: "https://crossy-road.gitlab.io/file/", img: "assets/games/crossy-road.webp", tags: ["arcade", "skill"] },
  { name: "Paper.io 2", url: "https://nb-ga.github.io/games-site/projects/paperio2/index.html", img: "assets/games/paper.io_2.webp", tags: ["io", "skill"] },
  { name: "Police Chase", url: "https://trafficrally.io/blacktop-police-chase.embed", img: "assets/games/police-chase.webp", tags: ["racing", "action"] },
  { name: "Stack", url: "https://ug17.github.io/play/Stack/", img: "assets/games/stack.webp", tags: ["skill", "arcade"] },
  { name: "Minecraft Launcher", url: "https://yee.pages.dev/", img: "assets/games/minecraft-launcher.webp", tags: ["sandbox"] },
  { name: "Terraria", url: "https://scratch.mit.edu/projects/322341152/embed", img: "assets/games/terraria.webp", tags: ["sandbox", "simulation"] },
  { name: "Flappy Bird", url: "https://nb-ga.github.io/games-site/projects/flappy-bird/index.html", img: "assets/games/flappy_bird.webp", tags: ["arcade", "skill"] },
  { name: "2048", url: "https://nb-ga.github.io/games-site/projects/2048/index.html", img: "assets/games/2048.webp", tags: ["puzzle"] },
  { name: "Ball Sort", url: "https://games-site.github.io/projects/ball-sort-puzzle/index.html", img: "assets/games/ball-sort.webp", tags: ["puzzle"] },
  { name: "Fun Typing IO", url: "https://game.azgame.io/fun-typing-io/", img: "assets/games/fun-typing-io.webp", tags: ["skill", "io"] },
  { name: "Breaking the bank", url: "https://rebemanae.github.io/breaking-the-bank/", img: "assets/games/breaking-the-bank.webp", tags: ["puzzle", "skill"] },
  { name: "Hero ball adventures", url: "https://slope-game.github.io/heroball-adventures/", img: "assets/games/heroball-adventures.webp", tags: ["arcade"] },
  { name: "Tomb of The Mask", url: "https://slope-game.github.io/new5923/tomb/", img: "assets/games/tomb-of-the-mask.webp", tags: ["arcade"] },
  { name: "JetPack JoyRide", url: "https://slope-game.github.io/rungame/jetpack-joyride/", img: "assets/games/jetpack-joyride.webp", tags: ["arcade"] },
  { name: "Block Post", url: "https://bitlifeonline.github.io/class19523/blockpost/", img: "assets/games/blockpost.webp", tags: ["skill"] },
  { name: "Parkour Jump", url: "https://bitlifeonline.github.io/parkour-jump/", img: "assets/games/parkour-jump.webp", tags: ["skill"] },
  { name: "Motox3m", url: "https://nb-ga.github.io/games-site/projects/moto-x3m/index.html", img: "assets/games/moto-x3m.webp", tags: ["racing", "skill"] },
  { name: "Motox3m 2", url: "https://nb-ga.github.io/games-site/projects/moto-x3m-2/index.html", img: "assets/games/motox3m_2.webp", tags: ["racing", "skill"] },
  { name: "Motox3m Winter", url: "https://games-site.github.io/projects/moto-x3m-winter/index.html", img: "assets/games/moto-x3m-4-winter.webp", tags: ["racing", "skill"] },
  { name: "Motox3m Spooky Land", url: "https://games-site.github.io/projects/moto-x3m-spooky-land/index.html", img: "assets/games/moto-x3m-spooky-land.webp", tags: ["racing", "skill"] },
  { name: "Motox3m Pool Party", url: "https://games-site.github.io/projects/moto-x3m-pool-party/index.html", img: "assets/games/moto-x3m-5-pool-party.webp", tags: ["racing", "skill"] },
  { name: "Longcat", url: "https://play.fancade.com/5BFC1C2A246D67DD?mp_assets=https://s2.minijuegosgratis.com/&mp_embed=0&mp_game&mp_game_id=252905&mp_game_uid=longcat", img: "assets/games/long_cat.webp", tags: ["arcade", "skill"] },
  { name: "Drive Mad", url: "https://drive-madgame.github.io/file/", img: "assets/games/drive-mad.webp", tags: ["racing", "skill"] },
  { name: "Dino Bros", url: "https://bitlifeonline.github.io/dino-bros/", img: "assets/games/dino-bros.webp", tags: ["arcade"] },
  { name: "Roper", url: "https://hyhygames.com/games/roper-poki-game/", img: "assets/games/roper.webp", tags: ["arcade"] },
  { name: "Recoil", url: "https://freetoplayz.github.io/recoil/", img: "assets/games/recoil.webp", tags: ["arcade", "action"] },
  { name: "Odd bot", url: "https://play.fancade.com/5D01F70D3373F2DD?key=y8&value=default", img: "assets/games/odd-bot.webp", tags: ["arcade"] },       
  { name: "Stick Man Climb", url: "https://szhong.4399.com/4399swf//upload_swf/ftp37/gamehwq/20211221/15/index.html", img: "assets/games/stickman-climb.webp", tags: ["platform", "skill"] },
  { name: "Stickman Climb 2", url: "https://h5.ant.games/game-assets/17266550232074/index.html", img: "assets/games/stickman-climb-2.webp", tags: ["skill", "plataform"] },
  { name: "Fnaf 1", url: "https://run3.io/popgame/fnaf/fnaf1/", img: "assets/games/fnaf1.webp", tags: ["horror"] },
  { name: "Fnaf 2", url: "https://nb-ga.github.io/games-site/projects/fnaf-2/index.html", img: "assets/games/fnaf2.webp", tags: ["horror"] },
  { name: "Fnaf 3", url: "https://nb-ga.github.io/games-site/projects/fnaf-3/index.html", img: "assets/games/fnaf3.webp", tags: ["horror"] },
  { name: "Fnaf 4", url: "https://games-site.github.io/projects/fnaf-4/index.html", img: "assets/games/fnaf4.webp", tags: ["horror"] },
  { name: "Fnaf Sister Location", url: "https://games-site.github.io/projects/fnaf-5/index.html", img: "assets/games/fnaf5.webp", tags: ["horror"] },
  { name: "Subway Surfers", url: "https://ug17.github.io/play/Subway-Surfers/", img: "assets/games/subway-surfers.webp", tags: ["arcade", "skill"] },
  { name: "Subway Surfers winter holiday", url: "https://ubg77.github.io/updatefaqs/subway-surfers-winter-holiday/", img: "assets/games/subway-surfers-winter-holiday.webp", tags: ["arcade", "skill"] },
  { name: "Subway Surfers New York", url: "https://ubg77.github.io/updatefaqs/subway-surfers-nyc/", img: "assets/games/subway-surfers-nyc.webp", tags: ["arcade", "skill"] },
  { name: "Subway Surfers Bali", url: "https://ubg77.github.io/updatefaqs/subway-surfers-bali/", img: "assets/games/subway-surfers-bali.webp", tags: ["arcade", "skill"] },
  { name: "Temple Run", url: "https://templerun.org/wp-content/uploads/games/html5/T/Temple%20Game%20Jungle/index.html", img: "assets/games/temple-run.webp", tags: ["arcade", "skill"] },
  { name: "Temple Run 2 Jungle Fall", url: "https://rebemanae.github.io/temple-run-2-jungle-fall/", img: "assets/games/temple-run-2-jungle-fall.webp", tags: ["arcade", "skill"] },
  { name: "Temple Run 2 Frozen Shadows", url: "https://rebemanae.github.io/temple-run-2-jungle-fall/", img: "assets/games/temple-run-2-frozen-shadows.webp", tags: ["arcade", "skill"] },
  { name: "Temple Run 2 Holi Festival", url: "https://rebemanae.github.io/temple-run-2-holi-festival/", img: "assets/games/temple-run-2-holi-festival.webp", tags: ["arcade", "skill"] },
  { name: "Fireboy & Watergirl 1", url: "https://games-site.github.io/projects/fireboy-and-watergirl-1/index.html", img: "assets/games/fireboy&watergirl_1.webp", tags: ["2player", "plataform"] },
  { name: "Fireboy & Watergirl 2", url: "https://games-site.github.io/projects/fireboy-and-watergirl-2/index.html", img: "assets/games/fireboy&watergirl_2.webp", tags: ["2player", "plataform"] },
  { name: "Fireboy & Watergirl 3", url: "https://games-site.github.io/projects/fireboy-and-watergirl-3/index.html", img: "assets/games/fireboy&watergirl_3.webp", tags: ["2player", "plataform"] },
  { name: "Fireboy & Watergirl 4", url: "https://games-site.github.io/projects/fireboy-and-watergirl-4/index.html", img: "assets/games/fireboy&watergirl_4.webp", tags: ["2player", "plataform"] },
  { name: "Fireboy & Watergirl 5", url: "https://games-site.github.io/projects/fireboy-and-watergirl-5/index.html", img: "assets/games/fireboy&watergirl_5.webp", tags: ["2player", "plataform"] },
  { name: "Fireboy & Watergirl 6", url: "https://games-site.github.io/projects/fireboy-and-watergirl-6/index.html", img: "assets/games/fireboy&watergirl_6.webp", tags: ["2player", "plataform"] },
  { name: "Bad Ice cream", url: "https://bitlifeonline.github.io/bad-ice-cream/", img: "assets/games/bad-ice-cream.webp", tags: ["arcade", "2player"] },
  { name: "Bad Ice cream 2", url: "https://onegamez.github.io/bad-ice-cream-2/", img: "assets/games/bad-ice-cream-2.webp", tags: ["arcade", "2player"] },
  { name: "Bad Ice cream 3", url: "https://onegamez.github.io/bad-ice-cream-3/", img: "assets/games/bad-ice-cream-3.webp", tags: ["arcade", "2player"] },
  { name: "Swingo", url: "https://bitlifeonline.github.io/class12523/swingo/", img: "assets/games/swingo.webp", tags: ["arcade", "skill"] },
  { name: "Blumgi ball", url: "https://bitlifeonline.github.io/class12523/blumgi-ball/", img: "assets/games/blumgi-ball.webp", tags: ["arcade", "skill"] },
  { name: "Blumgi castle", url: "https://bitlifeonline.github.io/class12523/blumgi-castle/", img: "assets/games/blumgi-castle.webp", tags: ["arcade", "skill", "2players"] },
  { name: "Blumgi slime", url: "https://bitlifeonline.github.io/class12523/blumgi-slime/", img: "assets/games/blumgi-slime.webp", tags: ["arcade", "skill", "2players"] },
  { name: "Friday Night Funkin", url: "https://fnf.kdata1.com/2025/fnf/7500/", img: "assets/games/fnf.webp", tags: ["music", "skill"] },
  { name: "Power Pamplona", url: "https://www.friv.com/z/games/powerpamplona/game.html", img: "assets/games/power-pamplona.webp", tags: ["skill", "arcade"] },
  { name: "Boxing Stars", url: "https://www.friv.com/z/games/boxingstars/game.html", img: "assets/games/boxing-stars.webp", tags: ["action", "skill"] },
  { name: "Steal a Brainrot", url: "https://st.8games.net/9/8g/igra-ukradi-brejnrot-original-3d/", img: "assets/games/steal-a-brainrot.webp", tags: ["puzzle", "tycoon"] },
  { name: "Plants vs Brainrots", url: "https://st.8games.net/7/8g/igra-brejnroty-protiv-rastenij/", img: "assets/games/plants-vs-brainrots.webp", tags: ["puzzle", "tycoon"] },
  { name: "Geometry Dash", url: "https://1games.io/game/geometry-lite/", img: "assets/games/geometry-dash.webp", tags: ["skill", "arcade"] },
  { name: "Geometry Vibes", url: "https://files.twoplayergames.org/files/games/g1/geometry-vibes-v11/index.html", img: "assets/games/geometry-vibes.webp", tags: ["skill", "arcade", "2player"] },
  { name: "Harvest Simulator", url: "https://g.igroutka.ru/games/1213/jtFMmdAVoke2w6qL/d8d9f2cc-186e-4695-adce-1ef984e47d59/index.html", img: "assets/games/harvest-simulator.webp", tags: ["simulation", "tycoon"] },
  { name: "That's not my neighbor", url: "https://gnhustgames.github.io/class-73/thats-not-my-neighbor/", img: "assets/games/thats-not-my-neighbor.webp", tags: ["puzzle"] },
  { name: "Raft", url: "https://gnhustgames.github.io/class-73/raft/", img: "assets/games/raft.webp", tags: ["simulation"] },
  { name: "Hollow Knight", url: "https://2games.io/embed/hollow-knight", img: "assets/games/hollow-knight.webp", tags: ["platform"] },
  { name: "Cuphead", url: "https://gnhustgames.github.io/cuphead/", img: "assets/games/cuphead.webp", tags: ["platform", "skill", "action"] },
  { name: "Fears to fathom home alone", url: "https://gnhustgames.github.io/class-69/fearstofathom-homealone/", img: "assets/games/ftp-home-alone.webp", tags: ["horror"] },
  { name: "Gta Chinatown", url: "https://retrogamesonline.io/grand-theft-auto-chinatown-wars-usa-enfrdeesit.embed", img: "assets/games/gta-chinatown.webp", tags: ["action", "skill"] },
  { name: "Rocket soccer derby", url: "https://rocket-soccer-derby.github.io/file/", img: "assets/games/rocket-soccer-derby.webp", tags: ["racing"] },
  { name: "Head Soccer 2024", url: "https://1games.io/game/head-soccer-2024/", img: "assets/games/head-soccer-2024.webp", tags: ["2player", "skill"] },
  { name: "Rubik", url: "https://rubikscu.be/", img: "assets/games/rubik.webp", tags: ["puzzle"] },
  { name: "Chill guy clicker", url: "https://game.azgame.io/chill-guy-clicker/", img: "assets/games/chill-guy-clicker.webp", tags: ["clicker"] },
  { name: "Cookie Clicker", url: "https://webglmath.github.io/cookie-clicker/", img: "assets/games/cookie-clicker.webp", tags: ["clicker"] },
  { name: "Sprunki Clicker", url: "https://game.azgame.io/sprunki-clicker/", img: "assets/games/sprunki-clicker.webp", tags: ["clicker"] },
  { name: "Bottle Jump", url: "https://1games.io/game/bottle-jump/", img: "assets/games/bottle-jump.webp", tags: ["skill", "arcade"] },
  { name: "Brain Test", url: "https://23azostore.github.io/s2/brain-test-2-tricky-stories/", img: "assets/games/brain-test.webp", tags: ["puzzle"] },
  { name: "Cut the Rope", url: "https://games-site.github.io/projects/ctr-time-travel/index.html", img: "assets/games/cut-the-rope.webp", tags: ["puzzle"] },
  { name: "Papery Planes", url: "https://games-site.github.io/projects/papery-planes/index.html", img: "assets/games/papery-planes.webp", tags: ["skill", "arcade"] },
  { name: "Sprunki", url: "https://azgames.io/game/sprunki/", img: "assets/games/sprunki.webp", tags: ["arcade"] },
  { name: "Jetski race", url: "https://1games.io/game/jetski-race/", img: "assets/games/jetski-race.webp", tags: ["racing", "skill"] },
  { name: "Deer adventure", url: "https://game.azgame.io/deer-adventure/", img: "assets/games/deer-adventure.webp", tags: ["arcade", "skill"] },
  { name: "Dude Theft Auto", url: "https://1games.io/game/dude-theft-auto/", img: "assets/games/dude-theft-auto.webp", tags: ["action", "skill"] },
  { name: "Billiards Master", url: "https://game.azgame.io/billiards-master/", img: "assets/games/billiards-master.webp", tags: ["skill"] },
  { name: "Block Blast 3D", url: "https://game.azgame.io/block-blast-3d/", img: "assets/games/block-blast-3d.webp", tags: ["arcade", "skill"] },
  { name: "Snow Road 3D", url: "https://1games.io/game/snow-road-3d/", img: "assets/games/snow-road-3d.webp", tags: ["racing", "skill"] },
  { name: "Bike Xtreme", url: "https://azgames.io/bike-xtreme.embed", img: "assets/games/bike-xtreme.webp", tags: ["racing", "skill"] },
  { name: "Stickman Racing", url: "https://azgames.io/stickman-racing.embed", img: "assets/games/stickman-racing.webp", tags: ["racing", "skill"] },
  { name: "Plants vs Zombies", url: "https://kdata1.com/2024/05/pvz2scratch/", img: "assets/games/plants-vs-zombies.webp", tags: ["skill", "arcade"] },
  { name: "Uno Online", url: "https://kdata1.com/2017/03/four-colors/", img: "assets/games/uno-online.webp", tags: ["skill"] },
  { name: "Stickman prison escape", url: "https://abinbins.github.io/a7/escaping-the-prison/", img: "assets/games/stickman-prison-escape.webp", tags: ["action", "skill"] },
  { name: "Murder", url: "https://h5.ant.games/game-assets/17477130192978/index.html", img: "assets/games/murder.webp", tags: ["action", "skill"] },
  { name: "Granny", url: "https://1games.io/game/granny-horror/", img: "assets/games/granny.webp", tags: ["horror"] },
  { name: "Plonky", url: "https://cdn.vietdp.com/file/vietdp-games/games/t52025/plonky/index.html", img: "assets/games/plonky.webp", tags: ["arcade", "skill"] },
  { name: "Drift.io", url: "https://drift.io/", img: "assets/games/drift.io.webp", tags: ["racing", "io"] },
  { name: "Traffic Escape", url: "https://fly.silvergames.com/m/traffic-escape/", img: "assets/games/traffic-escape.webp", tags: ["racing", "skill"] },
  { name: "Last chess standing", url: "https://playgroundfree.github.io/last-chess-standing/", img: "assets/games/last-chess-standing.webp", tags: ["skill"] },
  { name: "Blood Money!", url: "https://bloodmoney.1games.io/", img: "assets/games/blood-money.webp", tags: ["action", "skill"] },
  { name: "Blood Money! 2", url: "https://1games.io/game/bloodmoney-2/", img: "assets/games/blood-money-2.webp", tags: ["action", "skill"] },
  { name: "Scary teacher 3D", url: "https://g.igroutka.ru/games/1087/NgleEW1zP8YRpXGI/9d2ca9df-7f2c-4685-8907-e330be4ef190/index.html", img: "assets/games/scary-teacher-3d.webp", tags: ["horror"] },
  { name: "SchoolBoy Runaway", url: "https://st.8games.net/10/8g/igra-schoolboy-runaway/", img: "assets/games/school-boy-runaway.webp", tags: ["action", "skill"] },
  { name: "Escape Road City 2", url: "https://1games.io/game/escape-road-city-2/", img: "assets/games/escape-road-city-2.webp", tags: ["racing", "skill"] },
  { name: "Ragdoll Archers", url: "https://bitlifeonline.github.io/ragdoll-archers/", img: "assets/games/ragdoll-archers.webp", tags: ["skill", "arcade"] },
  { name: "Swipe Ball", url: "https://swipe-ball.1games.io/", img: "assets/games/swipe-ball.webp", tags: ["skill", "arcade"] },
  { name: "Flick Goal", url: "https://playgroundfree.github.io/flick-goal/", img: "assets/games/flick-goal.webp", tags: ["skill", "arcade"] },
  { name: "Fury Chase 2", url: "https://1games.io/game/fury-chase-2/", img: "assets/games/fury-chase-2.webp", tags: ["racing", "skill"] },
  { name: "Repo", url: "https://st.8games.net/10/8g/igra-repo-original/", img: "assets/games/repo.webp", tags: ["action", "skill"] },
  { name: "Golf Hit", url: "https://golf-hit.1games.io/", img: "assets/games/golf-hit.webp", tags: ["skill", "arcade"] },
  { name: "Dunk Dash", url: "https://1games.io/game/dunk-dash/", img: "assets/games/dunk-dash.webp", tags: ["skill", "arcade"] },
  { name: "Icy Dash", url: "https://1games.io/game/icy-dash/", img: "assets/games/icy-dash.webp", tags: ["skill", "arcade"] },
  { name: "Cat and Granny", url: "https://cdn.unblocked-games-free.com/games/4494/KQMUcZ73Nuneoj/390441/saesmjjdi8hyt0nhseqatqa5ku1gadbk/index.html", img: "assets/games/cat-and-granny.webp", tags: ["skill"] },
  { name: "Drive Beyond Horizons", url: "https://epicfreegames78.github.io/drive-beyond-horizons/", img: "assets/games/drive-beyond-horizons.webp", tags: ["racing", "skill"] },
  { name: "KoGaMa", url: "https://www.kogama.com/games/lagged/9231110/", img: "assets/games/kogama.webp", tags: ["sandbox"] },
  { name: "Fruit Ninja", url: "https://mountain658.github.io/g/fruitninja/fruitninja.html", img: "assets/games/fruit-ninja.webp", tags: ["skill", "arcade"] },
  { name: "Kick the buddy", url: "https://st.8games.net/dasha1/igry-novye/igra-kik-ze-badi/", img: "assets/games/kick-the-buddy.webp", tags: ["skill", "action"] },
  { name: "Raft Life", url: "https://freegames78.github.io/raft-life/", img: "assets/games/raft-life.webp", tags: ["sandbox", "skill"] },
  { name: "Stickman crazy box", url: "https://bitlifeonline.github.io/stickman-crazy-box/", img: "assets/games/stickman-crazy-box.webp", tags: ["skill", "action"] },
  { name: "Ping Pong Go!", url: "https://gnhustgames.github.io/ping-pong-go/", img: "assets/games/ping-pong-go.webp", tags: ["skill"] },
  { name: "Super Mario Bros", url: "https://frivez.com/games/super-mario-bros/index.html", img: "assets/games/super-mario-bros.webp", tags: ["platform", "arcade", "action"] },
  { name: "Survival Race", url: "https://st.8games.net/14/igra-bitva-superkarov-3d/", img: "assets/games/survival-race.webp", tags: ["racing", "action"] },
  { name: "Traffic rally", url: "https://1games.io/game/traffic-rally/", img: "assets/games/traffic-rally.webp", tags: ["racing", "simulation", "skill"] },
  { name: "Brain lines", url: "https://1games.io/game/brain-lines/", img: "assets/games/brain-lines.webp", tags: ["puzzle", "skill"] },
  { name: "Poor Rabit", url: "https://newgamesdaily.github.io/poor-bunny/", img: "assets/games/poor-rabbit.webp", tags: ["arcade", "skill", "platform"] },
  { name: "Basketball Stars", url: "https://basketball-stars.io/1.embed", img: "assets/games/basketball-stars.webp", tags: ["2players", "skill"] },
  { name: "Bounce Up", url: "https://bounce-up.1games.io/", img: "assets/games/bounce-up.webp", tags: ["arcade", "puzzle", "skill"] },
  { name: "Stickman Empires", url: "https://stickman-empires.1games.io/", img: "assets/games/stickman-empires.webp", tags: ["skill", "action"] },
  { name: "Jump Up", url: "https://1games.io/game/jump-up/", img: "assets/games/jump-up.webp", tags: ["arcade", "jump", "platform", "skill"] },
  { name: "Merge Arena", url: "https://bitlifeonline.github.io/merge-arena/", img: "assets/games/merge-arena.webp", tags: ["puzzle", "merge", "action"] },
  { name: "Penalty Shootout Multi League", url: "https://bitlifeonline.github.io/penalty-shootout-multi-league/", img: "assets/games/penalty-shootout-multi-league.webp", tags: ["skill"] },
  { name: "Gobattle", url: "https://bitlifeonline.github.io/gobattle/", img: "assets/games/gobattle.webp", tags: ["puzzle", "action", "2players"] },
  { name: "Canon Blast", url: "https://bitlifeonline.github.io/cannon-blast/", img: "assets/games/canon-blast.webp", tags: ["arcade", "skill"] },
  { name: "Cubes 2048.io", url: "https://bitlifeonline.github.io/cubes-2048-io/", img: "assets/games/cubes-2048.io.webp", tags: ["arcade", "skill"] },
  { name: "Obby parkour ultimate", url: "https://bitlifeonline.github.io/obby-parkour-ultimate/", img: "assets/games/obby-parkour-ultimate.webp", tags: ["platform", "skill"] },
  { name: "Stickmerge", url: "https://webglmath.github.io/stickmerge/", img: "assets/games/stickmerge.webp", tags: ["action", "skill", "merge"] },
  { name: "Brawl Stars", url: "https://web.cloudmoonapp.com/es/game/com.supercell.brawlstars/?from=list", img: "assets/games/brawl-stars.webp", tags: ["action", "skill"] },
  { name: "Clash Royale", url: "https://web.cloudmoonapp.com/es/game/com.supercell.clashroyale/", img: "assets/games/clash-royale.webp", tags: ["action", "skill"] },
  { name: "Clash of Clans", url: "https://web.cloudmoonapp.com/es/game/com.supercell.clashofclans/?from=list", img: "assets/games/clash-of-clans.webp", tags: ["action", "skill"] },
  { name: "Squad busters", url: "https://web.cloudmoonapp.com/es/game/com.supercell.squad/?from=list", img: "assets/games/squad_busters.webp", tags: ["action", "skill", "merge"] },
  { name: "Pacman", url: "https://www.onlinegames.io/games/2024/more/tapman/index.html", img: "assets/games/pacman.webp", tags: ["arcade"] }


];
  

































