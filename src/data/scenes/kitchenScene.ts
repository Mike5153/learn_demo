import type { SceneConfig } from '../../types/literacy';

/**
 * 场景二：“灶下炊事” (传统潮汕厨房烹饪实景)
 * 包含两套进阶体系：
 * - 第一套 (基础核心 7 字)：刀 (to¹)、切 (tshiek⁴)、米 (bî²)、鼎 (diã²)、炊 (tshui¹)、炒 (tsha²)、碗 (uã²)
 * - 第二套 (进阶拓展 7 字)：柴 (tshâ⁵)、锅 (uê¹)、油 (iû⁵)、盐 (iâm⁵)、铲 (sán²)、煮 (zé²)、汤 (thng¹)
 * 笔画采用权威 Hanzi Writer 书法中线平滑矢量轨迹 (800×800)
 */
export const kitchenSceneConfig: SceneConfig = {
  id: 'kitchen',
  name: '灶下炊事',
  subtitle: '厨房烹煮',
  icon: '🍳',
  hintText: '👆 点厨具学字',
  backText: '灶台',
  liquidType: 'soup',
  defaultWordId: 'knife',
  words: {
    knife: {
      id: 'knife',
      character: '刀',
      pinyin: 'dāo',
      teochewIPA: 'to¹',
      teochewAudio: '/audio/to1.mp3',
      triggerName: '菜刀',
      imageUrl: '/images/items/knife.png',
      tier: 'basic',
      strokes: [
        { name: '一横折钩', path: 'M 231,214 L 269,228 L 297,228 L 650,165 L 678,177 L 693,193 L 651,447 L 636,508 L 598,609 L 575,644 L 545,664 L 453,604', length: 1095 },
        { name: '二撇', path: 'M 399,237 L 425,258 L 427,272 L 394,372 L 344,471 L 302,530 L 239,593 L 138,669 L 107,685', length: 587 },
      ]
    },

    slice: {
      id: 'slice',
      character: '切',
      pinyin: 'qiē',
      teochewIPA: 'tshiek⁴',
      teochewAudio: '/audio/tshiek4.mp3',
      triggerName: '切菜',
      imageUrl: '/images/items/slice.png',
      tier: 'basic',
      strokes: [
        { name: '一横', path: 'M 142,398 L 158,401 L 192,399 L 342,354 L 374,353', length: 239 },
        { name: '二竖提', path: 'M 252,165 L 275,182 L 281,198 L 277,341 L 257,525 L 261,557 L 288,549 L 384,472', length: 557 },
        { name: '三竖弯钩', path: 'M 413,350 L 447,357 L 625,319 L 644,323 L 658,336 L 631,509 L 615,566 L 595,615 L 575,637 L 565,642 L 501,601', length: 659 },
        { name: '四撇', path: 'M 484,363 L 507,385 L 487,458 L 458,522 L 430,565 L 378,622 L 325,667 L 294,685', length: 412 },
      ]
    },

    rice: {
      id: 'rice',
      character: '米',
      pinyin: 'mǐ',
      teochewIPA: 'bî²',
      teochewAudio: '/audio/bi2.mp3',
      triggerName: '米缸',
      imageUrl: '/images/items/rice.png',
      tier: 'basic',
      strokes: [
        { name: '一点', path: 'M 240,264 L 292,299 L 305,323', length: 90 },
        { name: '二短撇', path: 'M 493,211 L 505,224 L 510,237 L 492,257 L 431,311', length: 140 },
        { name: '三横', path: 'M 177,399 L 213,407 L 368,388 L 529,362 L 570,370', length: 398 },
        { name: '四竖', path: 'M 349,165 L 366,178 L 382,200 L 376,493 L 367,685', length: 534 },
        { name: '五长撇', path: 'M 360,405 L 296,495 L 254,538 L 213,574 L 152,611', length: 296 },
        { name: '六长捺', path: 'M 392,402 L 401,426 L 426,457 L 492,530 L 527,559 L 554,576 L 648,589', length: 336 },
      ]
    },

    wok: {
      id: 'wok',
      character: '鼎',
      pinyin: 'dǐng',
      teochewIPA: 'diã²',
      teochewAudio: '/audio/tia2.mp3',
      triggerName: '铁鼎',
      imageUrl: '/images/items/wok.png',
      tier: 'basic',
      strokes: [
        { name: '一竖', path: 'M 318,167 L 338,189 L 344,202 L 349,318 L 357,375', length: 218 },
        { name: '二横折', path: 'M 355,180 L 370,186 L 439,169 L 479,165 L 486,167 L 498,181 L 503,189 L 497,246 L 495,327 L 488,374', length: 348 },
        { name: '三横', path: 'M 364,250 L 372,242 L 404,235 L 430,232 L 444,236', length: 85 },
        { name: '四横', path: 'M 366,303 L 374,296 L 412,289 L 434,288 L 448,292', length: 86 },
        { name: '五横', path: 'M 369,365 L 382,355 L 444,344 L 456,344 L 463,352', length: 102 },
        { name: '六竖折折', path: 'M 231,355 L 242,361 L 254,375 L 247,426 L 249,450 L 268,451 L 341,432 L 357,435 L 365,445 L 359,498 L 356,631 L 362,668', length: 454 },
        { name: '七横', path: 'M 202,537 L 226,542 L 251,539 L 331,520 L 341,510', length: 146 },
        { name: '八撇', path: 'M 258,559 L 270,568 L 272,576 L 255,611 L 222,655 L 188,685', length: 162 },
        { name: '九竖', path: 'M 584,310 L 596,342 L 573,390 L 556,399', length: 107 },
        { name: '十横', path: 'M 488,427 L 501,433 L 554,421 L 580,420 L 594,424', length: 109 },
        { name: '十一竖', path: 'M 451,418 L 469,436 L 473,451 L 475,564 L 467,645 L 473,684', length: 275 },
        { name: '十二横折', path: 'M 493,532 L 502,525 L 574,510 L 587,511 L 604,522 L 601,624 L 612,664', length: 262 },
      ]
    },

    steam: {
      id: 'steam',
      character: '炊',
      pinyin: 'chuī',
      teochewIPA: 'tshui¹',
      teochewAudio: '/audio/tshue1.mp3',
      triggerName: '蒸笼',
      imageUrl: '/images/items/steam.png',
      tier: 'basic',
      strokes: [
        { name: '一点', path: 'M 160,337 L 162,380 L 152,454', length: 118 },
        { name: '二短撇', path: 'M 326,289 L 332,314 L 280,350 L 262,369', length: 115 },
        { name: '三长撇', path: 'M 213,200 L 232,211 L 248,229 L 242,404 L 228,520 L 212,571 L 183,619 L 159,644 L 111,673', length: 538 },
        { name: '四长捺', path: 'M 251,506 L 257,514 L 306,549 L 321,576', length: 101 },
        { name: '五短撇', path: 'M 434,165 L 453,180 L 461,194 L 452,230 L 426,297 L 396,357 L 349,426', length: 300 },
        { name: '六横钩', path: 'M 417,355 L 546,319 L 576,317 L 594,334 L 545,395', length: 267 },
        { name: '七长撇', path: 'M 423,394 L 439,406 L 449,422 L 437,495 L 417,559 L 394,598 L 359,633 L 327,657 L 298,671', length: 347 },
        { name: '八长捺', path: 'M 461,492 L 463,510 L 475,526 L 531,598 L 582,653 L 601,663 L 689,685', length: 317 },
      ]
    },

    stirfry: {
      id: 'stirfry',
      character: '炒',
      pinyin: 'chǎo',
      teochewIPA: 'tsha²',
      teochewAudio: '/audio/tsha2.mp3',
      triggerName: '炒锅',
      imageUrl: '/images/items/stirfry.png',
      tier: 'basic',
      strokes: [
        { name: '一点', path: 'M 193,295 L 196,325 L 188,398', length: 104 },
        { name: '二短撇', path: 'M 340,236 L 351,256 L 295,309 L 292,318 L 285,322', length: 117 },
        { name: '三长撇', path: 'M 243,165 L 260,175 L 275,191 L 270,354 L 257,458 L 242,504 L 217,548 L 195,570 L 151,597', length: 491 },
        { name: '四长捺', path: 'M 278,445 L 284,453 L 327,484 L 341,509', length: 92 },
        { name: '五竖', path: 'M 451,169 L 463,176 L 480,197 L 475,263 L 472,411 L 476,436', length: 280 },
        { name: '六短撇', path: 'M 392,323 L 387,363 L 368,420', length: 100 },
        { name: '七点', path: 'M 552,276 L 621,318 L 639,338 L 649,358', length: 130 },
        { name: '八长撇', path: 'M 540,363 L 553,383 L 554,394 L 530,458 L 482,539 L 453,574 L 423,603 L 359,651 L 298,685', length: 434 },
      ]
    },

    bowl: {
      id: 'bowl',
      character: '碗',
      pinyin: 'wǎn',
      teochewIPA: 'uã²',
      teochewAudio: '/audio/ua2.mp3',
      triggerName: '海碗',
      imageUrl: '/images/items/bowl.png',
      tier: 'basic',
      strokes: [
        { name: '一横', path: 'M 169,285 L 211,287 L 300,258 L 340,256', length: 176 },
        { name: '二撇', path: 'M 222,302 L 243,319 L 230,362 L 208,414 L 170,479 L 139,519 L 102,555', length: 306 },
        { name: '三竖', path: 'M 175,424 L 194,450 L 212,579', length: 162 },
        { name: '四横折', path: 'M 214,438 L 240,425 L 280,413 L 300,423 L 304,429 L 288,493 L 274,500', length: 182 },
        { name: '五横', path: 'M 225,542 L 234,532 L 275,521 L 300,519 L 312,522', length: 93 },
        { name: '六点', path: 'M 458,165 L 509,193 L 525,216', length: 86 },
        { name: '七点', path: 'M 375,270 L 381,287 L 380,305 L 356,356 L 353,377', length: 114 },
        { name: '八横钩', path: 'M 402,306 L 409,300 L 485,283 L 601,262 L 621,269 L 632,281 L 632,287 L 592,333', length: 309 },
        { name: '九撇', path: 'M 390,371 L 405,388 L 404,397 L 368,459 L 336,495', length: 152 },
        { name: '十横撇', path: 'M 389,452 L 446,441 L 458,453 L 425,532 L 374,607 L 330,652 L 281,685', length: 373 },
        { name: '十一点', path: 'M 358,490 L 388,518 L 394,528', length: 53 },
        { name: '十二撇', path: 'M 530,419 L 548,421 L 601,406 L 617,410 L 623,419 L 615,490 L 599,527 L 585,537 L 550,517', length: 270 },
        { name: '十三竖弯钩', path: 'M 500,412 L 513,428 L 517,442 L 507,542 L 509,607 L 518,639 L 535,657 L 571,671 L 599,675 L 643,673 L 669,665 L 684,657 L 694,644 L 698,569', length: 505 },
      ]
    },

    wood: {
      id: 'wood',
      character: '柴',
      pinyin: 'chái',
      teochewIPA: 'tshâ⁵',
      teochewAudio: '/audio/tsha5.mp3',
      triggerName: '干柴',
      imageUrl: '/images/items/wood.png',
      tier: 'advanced',
      strokes: [
        { name: '一竖', path: 'M 276,190 L 301,209 L 302,218 L 304,347 L 302,357 L 295,363', length: 189 },
        { name: '二横', path: 'M 320,287 L 326,277 L 346,271 L 374,273', length: 61 },
        { name: '三竖', path: 'M 204,277 L 228,298 L 240,371 L 233,379', length: 117 },
        { name: '四提', path: 'M 185,402 L 215,410 L 372,348', length: 200 },
        { name: '五撇', path: 'M 504,210 L 511,222 L 513,233 L 471,261 L 422,287 L 421,293', length: 137 },
        { name: '六捺', path: 'M 392,165 L 413,193 L 405,245 L 405,296 L 410,340 L 419,360 L 446,372 L 485,375 L 523,373 L 551,366 L 558,356 L 560,303', length: 406 },
        { name: '七横', path: 'M 158,485 L 194,494 L 310,474 L 535,447 L 580,462', length: 429 },
        { name: '八竖', path: 'M 354,406 L 360,411 L 371,429 L 363,637 L 370,685', length: 286 },
        { name: '九撇', path: 'M 352,486 L 334,501 L 299,542 L 264,572 L 203,610 L 153,629', length: 249 },
        { name: '十捺', path: 'M 388,482 L 394,493 L 399,494 L 457,543 L 504,577 L 536,595 L 581,602 L 647,606', length: 300 },
      ]
    },

    pot_stove: {
      id: 'pot_stove',
      character: '锅',
      pinyin: 'guō',
      teochewIPA: 'uê¹',
      teochewAudio: '/audio/ue1.mp3',
      triggerName: '砂锅',
      imageUrl: '/images/items/pot_stove.png',
      tier: 'advanced',
      strokes: [
        { name: '一撇', path: 'M 281,165 L 299,181 L 306,198 L 275,261 L 236,329 L 189,392 L 130,461 L 112,474', length: 383 },
        { name: '二横', path: 'M 273,306 L 376,284 L 399,285', length: 128 },
        { name: '三横', path: 'M 218,406 L 256,406 L 331,381 L 364,378', length: 150 },
        { name: '四竖', path: 'M 183,515 L 198,518 L 234,514 L 327,486 L 364,486', length: 186 },
        { name: '五提', path: 'M 261,425 L 282,436 L 284,458 L 282,546 L 271,625 L 274,640 L 303,633 L 369,592', length: 336 },
        { name: '六竖', path: 'M 439,232 L 459,249 L 462,255 L 488,386', length: 167 },
        { name: '七横折', path: 'M 483,237 L 489,243 L 508,241 L 588,225 L 604,231 L 617,248 L 612,266 L 597,311 L 578,327', length: 239 },
        { name: '八横', path: 'M 501,362 L 513,355 L 557,346 L 608,341 L 622,345', length: 125 },
        { name: '九竖', path: 'M 397,443 L 414,464 L 422,486 L 417,654 L 424,685', length: 250 },
        { name: '十横折钩', path: 'M 430,454 L 448,461 L 573,432 L 650,423 L 663,424 L 683,439 L 688,446 L 682,504 L 686,609 L 681,654 L 674,670 L 649,668 L 583,644', length: 593 },
        { name: '十一竖', path: 'M 519,367 L 539,384 L 546,401 L 531,503 L 522,529 L 505,558 L 474,588 L 451,602', length: 279 },
        { name: '十二横', path: 'M 555,511 L 560,521 L 618,560 L 633,587', length: 112 },
      ]
    },

    oil: {
      id: 'oil',
      character: '油',
      pinyin: 'yóu',
      teochewIPA: 'iû⁵',
      teochewAudio: '/audio/iu5.mp3',
      triggerName: '油罐',
      imageUrl: '/images/items/oil.png',
      tier: 'advanced',
      strokes: [
        { name: '一点', path: 'M 216,209 L 270,245 L 286,271', length: 95 },
        { name: '二点', path: 'M 160,355 L 212,388 L 232,410', length: 91 },
        { name: '三提', path: 'M 205,685 L 195,658 L 193,628 L 208,602 L 277,454', length: 252 },
        { name: '四竖', path: 'M 295,368 L 320,391 L 328,411 L 350,577 L 363,620', length: 268 },
        { name: '五横折', path: 'M 340,380 L 357,390 L 479,372 L 590,347 L 613,348 L 629,359 L 640,372 L 627,472 L 612,569 L 607,587 L 592,611 L 592,650', length: 601 },
        { name: '六横', path: 'M 385,487 L 433,490 L 531,468 L 555,469', length: 173 },
        { name: '七竖', path: 'M 435,165 L 472,195 L 474,222 L 468,549 L 467,563 L 456,576', length: 433 },
        { name: '八横', path: 'M 376,613 L 384,603 L 427,596 L 532,581 L 557,579 L 574,583', length: 205 },
      ]
    },

    salt: {
      id: 'salt',
      character: '盐',
      pinyin: 'yán',
      teochewIPA: 'iâm⁵',
      teochewAudio: '/audio/iam5.mp3',
      triggerName: '盐罐',
      imageUrl: '/images/items/salt.png',
      tier: 'advanced',
      strokes: [
        { name: '一横', path: 'M 210,312 L 233,315 L 256,312 L 344,285 L 373,283', length: 168 },
        { name: '二竖', path: 'M 287,187 L 308,202 L 315,214 L 310,381 L 299,400', length: 229 },
        { name: '三横', path: 'M 180,441 L 201,450 L 220,450 L 393,380', length: 228 },
        { name: '四撇', path: 'M 430,165 L 445,173 L 459,191 L 460,315 L 450,477', length: 326 },
        { name: '五点', path: 'M 482,299 L 484,306 L 521,322 L 576,353 L 600,384', length: 150 },
        { name: '六竖', path: 'M 230,524 L 244,534 L 254,551 L 277,650 L 288,661', length: 154 },
        { name: '七横折', path: 'M 263,524 L 281,532 L 498,497 L 530,499 L 545,514 L 549,524 L 524,621 L 504,637', length: 429 },
        { name: '八竖', path: 'M 343,538 L 341,544 L 352,626 L 360,653', length: 117 },
        { name: '九竖', path: 'M 432,522 L 452,538 L 432,625 L 421,648', length: 140 },
        { name: '十横', path: 'M 162,678 L 195,685 L 318,670 L 569,654 L 607,657 L 638,668', length: 480 },
      ]
    },

    spatula: {
      id: 'spatula',
      character: '铲',
      pinyin: 'chǎn',
      teochewIPA: 'sán²',
      teochewAudio: '/audio/cang2.mp3',
      triggerName: '锅铲',
      imageUrl: '/images/items/spatula.png',
      tier: 'advanced',
      strokes: [
        { name: '一撇', path: 'M 282,171 L 298,186 L 305,201 L 273,267 L 199,378 L 165,419 L 135,447', length: 340 },
        { name: '二横', path: 'M 286,285 L 304,275 L 356,262 L 385,261', length: 103 },
        { name: '三横', path: 'M 217,378 L 250,375 L 331,351 L 354,353', length: 141 },
        { name: '四竖', path: 'M 176,476 L 215,477 L 329,441 L 363,439', length: 193 },
        { name: '五提', path: 'M 262,389 L 280,399 L 284,407 L 286,490 L 277,565 L 280,587 L 306,579 L 360,538', length: 305 },
        { name: '六点', path: 'M 480,165 L 536,196 L 557,220', length: 96 },
        { name: '七横', path: 'M 428,274 L 471,277 L 561,263 L 611,251 L 655,249', length: 230 },
        { name: '八撇', path: 'M 455,319 L 484,353 L 492,371', length: 64 },
        { name: '九点', path: 'M 574,279 L 584,288 L 592,302 L 567,366 L 554,385', length: 121 },
        { name: '十横折钩', path: 'M 441,405 L 460,414 L 618,390 L 646,389 L 665,394', length: 229 },
        { name: '十一竖', path: 'M 406,398 L 423,414 L 428,430 L 425,482 L 411,561 L 397,596 L 378,632 L 345,668 L 315,685', length: 334 },
      ]
    },

    boil: {
      id: 'boil',
      character: '煮',
      pinyin: 'zhǔ',
      teochewIPA: 'zé²',
      teochewAudio: '/audio/ze2.mp3',
      triggerName: '慢煮',
      imageUrl: '/images/items/boil.png',
      tier: 'advanced',
      strokes: [
        { name: '一横', path: 'M 288,260 L 302,264 L 325,264 L 426,243 L 459,243', length: 174 },
        { name: '二竖', path: 'M 372,165 L 397,186 L 391,323 L 381,337', length: 187 },
        { name: '三横', path: 'M 179,374 L 214,379 L 337,356 L 590,325 L 614,327 L 646,336', length: 473 },
        { name: '四撇', path: 'M 549,237 L 516,239 L 455,316 L 348,425 L 238,521 L 189,554 L 154,572', length: 528 },
        { name: '五竖', path: 'M 329,402 L 340,414 L 345,432 L 340,565', length: 168 },
        { name: '六横折', path: 'M 370,423 L 391,410 L 458,393 L 483,398 L 493,409 L 497,524 L 493,566', length: 291 },
        { name: '七横', path: 'M 359,484 L 368,477 L 393,472 L 427,468 L 449,471', length: 93 },
        { name: '八横', path: 'M 354,549 L 369,540 L 452,529 L 463,529 L 468,536', length: 121 },
        { name: '九点', path: 'M 262,590 L 252,628 L 231,667 L 226,685', length: 102 },
        { name: '十点', path: 'M 335,599 L 359,636 L 366,659', length: 68 },
        { name: '十一点', path: 'M 429,590 L 464,635 L 470,653', length: 76 },
        { name: '十二点', path: 'M 533,569 L 597,633 L 604,648 L 608,670', length: 129 },
      ]
    },

    soup: {
      id: 'soup',
      character: '汤',
      pinyin: 'tāng',
      teochewIPA: 'thng¹',
      teochewAudio: '/audio/thng1.mp3',
      triggerName: '鲜汤',
      imageUrl: '/images/items/soup.png',
      tier: 'advanced',
      strokes: [
        { name: '一点', path: 'M 207,165 L 268,207 L 284,235', length: 106 },
        { name: '二点', path: 'M 153,313 L 207,355 L 218,373', length: 90 },
        { name: '三提', path: 'M 183,681 L 174,659 L 172,625 L 192,591 L 274,424', length: 283 },
        { name: '四横折折折钩', path: 'M 345,203 L 379,211 L 494,185 L 508,186 L 523,198 L 486,250 L 412,333 L 389,365 L 381,383 L 406,387 L 602,353 L 620,354 L 634,361 L 647,375 L 634,470 L 617,541 L 593,614 L 571,652 L 553,674 L 536,685 L 462,638', length: 1123 },
        { name: '五撇', path: 'M 402,406 L 416,419 L 417,426 L 398,468 L 353,531 L 321,562 L 304,574', length: 215 },
        { name: '六撇', path: 'M 507,379 L 532,402 L 506,470 L 479,523 L 421,605 L 375,652 L 355,669 L 345,671 L 343,676', length: 374 },
      ]
    },

  }
};
