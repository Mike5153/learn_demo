import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：清早食糜 (杂咸白粥)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const porridgeSceneConfig: SceneConfig = {
  id: 'porridge',
  name: '清早食糜',
  subtitle: '杂咸白粥',
  icon: '🥣',
  hintText: '👆 点餐桌饭食识字',
  backText: '饭桌',
  liquidType: 'water',
  defaultWordId: 'porridge_rice',
  words: {
  "porridge_rice": {
    "id": "porridge_rice",
    "character": "糜",
    "pinyin": "méi",
    "teochewIPA": "mûê⁵",
    "teochewAudio": "/audio/mi5.mp3",
    "triggerName": "砂锅白粥",
    "imageUrl": "/images/items/porridge_rice.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 397,165 L 444,183 L 458,200",
        "length": 72
      },
      {
        "name": "二笔",
        "path": "M 309,239 L 314,244 L 326,247 L 351,247 L 454,232 L 545,214 L 574,215",
        "length": 270
      },
      {
        "name": "三笔",
        "path": "M 269,229 L 289,249 L 291,261 L 275,386 L 259,456 L 236,519 L 217,556 L 170,624 L 151,645",
        "length": 458
      },
      {
        "name": "四笔",
        "path": "M 315,334 L 342,335 L 405,318 L 429,318",
        "length": 116
      },
      {
        "name": "五笔",
        "path": "M 364,273 L 382,291 L 377,409 L 379,433",
        "length": 168
      },
      {
        "name": "六笔",
        "path": "M 367,343 L 362,346 L 359,365 L 353,375 L 327,409 L 310,428 L 304,429 L 304,433",
        "length": 115
      },
      {
        "name": "七笔",
        "path": "M 394,350 L 395,356 L 418,383",
        "length": 42
      },
      {
        "name": "八笔",
        "path": "M 453,311 L 487,312 L 556,294 L 577,293",
        "length": 126
      },
      {
        "name": "九笔",
        "path": "M 488,255 L 507,274 L 503,348 L 504,416",
        "length": 169
      },
      {
        "name": "十笔",
        "path": "M 490,324 L 482,350 L 457,383 L 429,412",
        "length": 109
      },
      {
        "name": "十一笔",
        "path": "M 521,341 L 522,348 L 570,382 L 579,400",
        "length": 86
      },
      {
        "name": "十二笔",
        "path": "M 341,461 L 369,485 L 375,497",
        "length": 50
      },
      {
        "name": "十三笔",
        "path": "M 516,434 L 522,450 L 466,491",
        "length": 86
      },
      {
        "name": "十四笔",
        "path": "M 283,537 L 314,542 L 440,524 L 577,512 L 614,523",
        "length": 335
      },
      {
        "name": "十五笔",
        "path": "M 416,442 L 431,464 L 423,638 L 429,685",
        "length": 248
      },
      {
        "name": "十六笔",
        "path": "M 412,541 L 391,574 L 353,609 L 310,638 L 258,660",
        "length": 199
      },
      {
        "name": "17笔",
        "path": "M 445,538 L 450,541 L 451,547 L 470,566 L 550,634 L 577,642 L 649,652",
        "length": 245
      }
    ]
  },
  "fish": {
    "id": "fish",
    "character": "鱼",
    "pinyin": "yú",
    "teochewIPA": "hê⁵",
    "teochewAudio": "/audio/hur5.mp3",
    "triggerName": "干煎巴浪",
    "imageUrl": "/images/items/fish.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 359,165 L 370,181 L 372,198 L 343,237 L 286,297 L 247,329 L 223,343",
        "length": 246
      },
      {
        "name": "二笔",
        "path": "M 349,263 L 374,261 L 445,244 L 462,245 L 481,255 L 446,312 L 401,367",
        "length": 275
      },
      {
        "name": "三笔",
        "path": "M 228,389 L 250,405 L 257,421 L 300,598",
        "length": 227
      },
      {
        "name": "四笔",
        "path": "M 270,392 L 285,399 L 350,386 L 492,365 L 531,366 L 539,373 L 556,396 L 542,440 L 525,523 L 509,566 L 513,587",
        "length": 503
      },
      {
        "name": "五笔",
        "path": "M 320,485 L 348,484 L 436,467 L 463,465 L 477,470",
        "length": 160
      },
      {
        "name": "六笔",
        "path": "M 380,394 L 397,409 L 399,422 L 398,536 L 388,549",
        "length": 166
      },
      {
        "name": "七笔",
        "path": "M 314,581 L 325,574 L 474,556 L 486,549",
        "length": 177
      },
      {
        "name": "八笔",
        "path": "M 135,671 L 180,685 L 369,662 L 596,647 L 629,652 L 665,667",
        "length": 537
      }
    ]
  },
  "veggies": {
    "id": "veggies",
    "character": "菜",
    "pinyin": "cài",
    "teochewIPA": "tshài³",
    "teochewAudio": "/audio/tshai3.mp3",
    "triggerName": "黑油菜脯",
    "imageUrl": "/images/items/veggies.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 197,256 L 228,260 L 349,241 L 506,227 L 539,230 L 559,237",
        "length": 366
      },
      {
        "name": "二笔",
        "path": "M 278,198 L 301,213 L 318,294",
        "length": 110
      },
      {
        "name": "三笔",
        "path": "M 437,165 L 446,169 L 456,188 L 422,280",
        "length": 129
      },
      {
        "name": "四笔",
        "path": "M 425,308 L 390,298 L 342,322 L 272,341",
        "length": 163
      },
      {
        "name": "五笔",
        "path": "M 239,374 L 278,401 L 294,427",
        "length": 78
      },
      {
        "name": "六笔",
        "path": "M 341,352 L 368,380 L 375,395",
        "length": 55
      },
      {
        "name": "七笔",
        "path": "M 481,323 L 489,343 L 428,397 L 421,399 L 419,403",
        "length": 115
      },
      {
        "name": "八笔",
        "path": "M 191,488 L 214,494 L 307,479 L 511,458 L 536,460 L 558,469",
        "length": 372
      },
      {
        "name": "九笔",
        "path": "M 358,424 L 372,439 L 375,452 L 368,640 L 375,685",
        "length": 268
      },
      {
        "name": "十笔",
        "path": "M 356,488 L 311,548 L 271,584 L 227,613 L 177,635",
        "length": 236
      },
      {
        "name": "十一笔",
        "path": "M 389,487 L 397,503 L 441,548 L 513,606 L 556,619 L 623,630",
        "length": 286
      }
    ]
  },
  "egg": {
    "id": "egg",
    "character": "蛋",
    "pinyin": "dàn",
    "teochewIPA": "nŋ̄⁷",
    "teochewAudio": "/audio/tang3.mp3",
    "triggerName": "出油咸蛋",
    "imageUrl": "/images/items/egg.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 220,198 L 243,202 L 472,165 L 506,166 L 524,183 L 481,236",
        "length": 382
      },
      {
        "name": "二笔",
        "path": "M 364,198 L 380,209 L 386,220 L 383,314 L 393,330",
        "length": 145
      },
      {
        "name": "三笔",
        "path": "M 404,282 L 413,274 L 453,266 L 477,265 L 493,269",
        "length": 93
      },
      {
        "name": "四笔",
        "path": "M 256,244 L 273,271 L 244,328 L 205,380 L 176,407 L 140,432",
        "length": 244
      },
      {
        "name": "五笔",
        "path": "M 294,295 L 295,301 L 382,343 L 465,375 L 542,399 L 575,400 L 660,386",
        "length": 391
      },
      {
        "name": "六笔",
        "path": "M 239,451 L 256,462 L 264,475 L 292,565",
        "length": 130
      },
      {
        "name": "七笔",
        "path": "M 275,451 L 288,458 L 399,443 L 447,433 L 463,432 L 477,436 L 495,454 L 475,497 L 458,503",
        "length": 297
      },
      {
        "name": "八笔",
        "path": "M 303,551 L 309,543 L 456,523 L 484,524 L 496,530",
        "length": 200
      },
      {
        "name": "九笔",
        "path": "M 349,385 L 380,410 L 375,594 L 365,609",
        "length": 242
      },
      {
        "name": "十笔",
        "path": "M 198,640 L 236,655 L 483,603 L 496,605",
        "length": 306
      },
      {
        "name": "十一笔",
        "path": "M 472,557 L 544,634 L 559,657 L 566,685",
        "length": 162
      }
    ]
  },
  "meat": {
    "id": "meat",
    "character": "肉",
    "pinyin": "ròu",
    "teochewIPA": "bah⁴",
    "teochewAudio": "/audio/nek8.mp3",
    "triggerName": "潮汕卤肉",
    "imageUrl": "/images/items/meat.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 214,286 L 230,301 L 238,316 L 242,364 L 237,505 L 228,593 L 218,638 L 217,676",
        "length": 401
      },
      {
        "name": "二笔",
        "path": "M 257,299 L 274,308 L 541,266 L 554,268 L 577,288 L 586,585 L 583,659 L 572,685 L 549,681 L 492,659",
        "length": 817
      },
      {
        "name": "三笔",
        "path": "M 379,165 L 392,171 L 411,192 L 405,267 L 390,328 L 381,351 L 356,389 L 324,415 L 291,431",
        "length": 329
      },
      {
        "name": "四笔",
        "path": "M 404,351 L 410,349 L 433,362 L 473,388 L 487,402 L 493,415",
        "length": 115
      },
      {
        "name": "五笔",
        "path": "M 383,425 L 396,449 L 371,495 L 349,525 L 320,553 L 288,574",
        "length": 195
      },
      {
        "name": "六笔",
        "path": "M 391,498 L 400,496 L 459,534 L 478,551 L 490,574",
        "length": 131
      }
    ]
  },
  "warm": {
    "id": "warm",
    "character": "温",
    "pinyin": "wēn",
    "teochewIPA": "un¹",
    "teochewAudio": "/audio/ung1.mp3",
    "triggerName": "温热适口",
    "imageUrl": "/images/items/warm.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 174,165 L 232,201 L 252,229",
        "length": 103
      },
      {
        "name": "二笔",
        "path": "M 107,308 L 169,344 L 188,368",
        "length": 102
      },
      {
        "name": "三笔",
        "path": "M 145,685 L 135,660 L 133,622 L 235,425",
        "length": 287
      },
      {
        "name": "四笔",
        "path": "M 315,200 L 335,218 L 340,229 L 372,393",
        "length": 206
      },
      {
        "name": "五笔",
        "path": "M 356,206 L 371,211 L 505,185 L 531,185 L 548,191 L 565,210 L 541,311 L 523,361 L 526,375",
        "length": 393
      },
      {
        "name": "六笔",
        "path": "M 377,297 L 383,291 L 437,279 L 473,275 L 488,279",
        "length": 116
      },
      {
        "name": "七笔",
        "path": "M 389,374 L 394,366 L 499,349",
        "length": 116
      },
      {
        "name": "八笔",
        "path": "M 286,471 L 303,488 L 311,502 L 333,618 L 346,632",
        "length": 177
      },
      {
        "name": "九笔",
        "path": "M 320,473 L 335,481 L 526,447 L 569,444 L 582,447 L 601,465 L 604,475 L 578,591 L 559,607",
        "length": 448
      },
      {
        "name": "十笔",
        "path": "M 407,482 L 404,491 L 412,531 L 419,609 L 414,624",
        "length": 144
      },
      {
        "name": "十一笔",
        "path": "M 481,467 L 497,481 L 504,495 L 487,608 L 475,616",
        "length": 166
      },
      {
        "name": "十二笔",
        "path": "M 236,653 L 272,660 L 438,638 L 623,624 L 650,626 L 693,639",
        "length": 462
      }
    ]
  },
  "eat": {
    "id": "eat",
    "character": "食",
    "pinyin": "shí",
    "teochewIPA": "tsiah⁸",
    "teochewAudio": "/audio/tsiah8.mp3",
    "triggerName": "食朝食饱",
    "imageUrl": "/images/items/eat.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 369,165 L 382,179 L 388,193 L 354,256 L 306,323 L 264,370 L 206,421 L 123,474",
        "length": 427
      },
      {
        "name": "二笔",
        "path": "M 407,217 L 407,224 L 484,301 L 560,365 L 585,374 L 677,384",
        "length": 334
      },
      {
        "name": "三笔",
        "path": "M 362,297 L 403,319 L 420,336",
        "length": 71
      },
      {
        "name": "四笔",
        "path": "M 322,384 L 337,389 L 447,362 L 458,364 L 468,374 L 474,382 L 473,390 L 449,486 L 440,507 L 442,520",
        "length": 307
      },
      {
        "name": "五笔",
        "path": "M 330,456 L 336,450 L 369,442 L 399,437 L 410,440",
        "length": 84
      },
      {
        "name": "六笔",
        "path": "M 330,521 L 340,513 L 419,498",
        "length": 93
      },
      {
        "name": "七笔",
        "path": "M 283,377 L 289,378 L 306,397 L 312,439 L 314,546 L 307,638 L 308,662 L 338,655 L 409,615",
        "length": 410
      },
      {
        "name": "八笔",
        "path": "M 510,505 L 516,517 L 515,529 L 448,579",
        "length": 109
      },
      {
        "name": "九笔",
        "path": "M 370,565 L 452,601 L 520,637 L 551,660 L 565,685",
        "length": 234
      }
    ]
  },
  "full": {
    "id": "full",
    "character": "饱",
    "pinyin": "bǎo",
    "teochewIPA": "pá²",
    "teochewAudio": "/audio/pa2.mp3",
    "triggerName": "肚腹饱暖",
    "imageUrl": "/images/items/full.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 264,191 L 279,200 L 288,211 L 287,217 L 276,259 L 249,324 L 221,378 L 196,413 L 147,469 L 127,486",
        "length": 356
      },
      {
        "name": "二笔",
        "path": "M 259,338 L 329,318 L 347,317 L 364,324 L 331,380 L 308,412",
        "length": 214
      },
      {
        "name": "三笔",
        "path": "M 242,409 L 265,439 L 265,540 L 257,601 L 262,623 L 286,616 L 355,567",
        "length": 333
      },
      {
        "name": "四笔",
        "path": "M 471,165 L 489,180 L 496,195 L 487,222 L 470,262 L 436,322 L 407,365 L 388,385",
        "length": 260
      },
      {
        "name": "五笔",
        "path": "M 440,346 L 456,338 L 599,306 L 610,309 L 620,320 L 605,444 L 589,494 L 571,519 L 563,524 L 541,516 L 513,499",
        "length": 465
      },
      {
        "name": "六笔",
        "path": "M 417,433 L 424,436 L 475,418 L 487,419 L 496,427 L 497,438 L 486,478 L 472,488",
        "length": 156
      },
      {
        "name": "七笔",
        "path": "M 413,525 L 467,506 L 498,508",
        "length": 88
      },
      {
        "name": "八笔",
        "path": "M 386,428 L 399,441 L 403,453 L 398,564 L 404,621 L 414,645 L 447,670 L 485,681 L 543,685 L 601,677 L 636,665 L 668,639 L 673,553",
        "length": 587
      }
    ]
  },
  "salty": {
    "id": "salty",
    "character": "咸",
    "pinyin": "xián",
    "teochewIPA": "kiâm⁵",
    "teochewAudio": "/audio/ham5.mp3",
    "triggerName": "杂咸小菜",
    "imageUrl": "/images/items/salty.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 269,349 L 284,354 L 316,351 L 408,332 L 486,310 L 514,305 L 530,306",
        "length": 267
      },
      {
        "name": "二笔",
        "path": "M 221,343 L 242,355 L 249,371 L 248,464 L 236,523 L 217,566 L 184,611 L 131,658",
        "length": 369
      },
      {
        "name": "三笔",
        "path": "M 292,444 L 330,442 L 377,425 L 408,422",
        "length": 119
      },
      {
        "name": "四笔",
        "path": "M 276,508 L 295,528 L 312,621",
        "length": 122
      },
      {
        "name": "五笔",
        "path": "M 311,510 L 320,514 L 373,499 L 386,502 L 397,514 L 397,519 L 387,556 L 374,566",
        "length": 154
      },
      {
        "name": "六笔",
        "path": "M 323,598 L 333,591 L 365,583 L 407,585",
        "length": 87
      },
      {
        "name": "七笔",
        "path": "M 361,165 L 386,174 L 405,190 L 421,301 L 455,432 L 495,534 L 534,602 L 567,642 L 595,667 L 620,681 L 641,685 L 655,649 L 669,567",
        "length": 748
      },
      {
        "name": "八笔",
        "path": "M 550,392 L 566,406 L 568,415 L 545,476 L 519,526 L 476,589 L 436,633 L 404,660",
        "length": 330
      },
      {
        "name": "九笔",
        "path": "M 490,198 L 556,228 L 569,241",
        "length": 91
      }
    ]
  },
  "soy_paste": {
    "id": "soy_paste",
    "character": "豆",
    "pinyin": "dòu",
    "teochewIPA": "tâu⁷",
    "teochewAudio": "/audio/tau7.mp3",
    "triggerName": "普宁豆瓣",
    "imageUrl": "/images/items/soy_paste.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 259,196 L 320,198 L 470,165 L 512,166",
        "length": 257
      },
      {
        "name": "二笔",
        "path": "M 218,327 L 235,337 L 251,357 L 284,460",
        "length": 153
      },
      {
        "name": "三笔",
        "path": "M 259,324 L 279,333 L 415,308 L 442,298 L 484,297 L 492,301 L 512,324 L 490,372 L 463,390",
        "length": 356
      },
      {
        "name": "四笔",
        "path": "M 296,448 L 308,436 L 447,413 L 491,414 L 505,418",
        "length": 216
      },
      {
        "name": "五笔",
        "path": "M 254,517 L 294,560 L 307,595",
        "length": 96
      },
      {
        "name": "六笔",
        "path": "M 452,484 L 467,495 L 475,510 L 414,625 L 401,634",
        "length": 182
      },
      {
        "name": "七笔",
        "path": "M 96,677 L 138,685 L 344,657 L 629,631 L 652,633 L 704,649",
        "length": 614
      }
    ]
  },
  "ginger": {
    "id": "ginger",
    "character": "姜",
    "pinyin": "jiāng",
    "teochewIPA": "kiũ¹",
    "teochewAudio": "/audio/kiang1.mp3",
    "triggerName": "细切生姜",
    "imageUrl": "/images/items/ginger.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 309,196 L 346,222 L 360,239",
        "length": 67
      },
      {
        "name": "二笔",
        "path": "M 470,165 L 485,187 L 424,246",
        "length": 111
      },
      {
        "name": "三笔",
        "path": "M 300,289 L 328,294 L 355,292 L 483,271 L 514,271",
        "length": 216
      },
      {
        "name": "四笔",
        "path": "M 284,364 L 304,368 L 326,367 L 478,343 L 513,347",
        "length": 232
      },
      {
        "name": "五笔",
        "path": "M 387,302 L 402,316 L 400,395 L 390,408",
        "length": 116
      },
      {
        "name": "六笔",
        "path": "M 263,432 L 294,437 L 392,422 L 506,412 L 546,421",
        "length": 286
      },
      {
        "name": "七笔",
        "path": "M 363,441 L 375,451 L 378,460 L 326,564 L 340,573 L 382,586 L 429,607 L 506,647 L 544,685",
        "length": 394
      },
      {
        "name": "八笔",
        "path": "M 449,478 L 460,487 L 465,497 L 456,533 L 433,576 L 398,617 L 371,636 L 334,651 L 300,659 L 259,661",
        "length": 314
      },
      {
        "name": "九笔",
        "path": "M 153,524 L 173,530 L 196,530 L 340,510 L 600,489 L 647,503",
        "length": 499
      }
    ]
  },
  "spoon": {
    "id": "spoon",
    "character": "匙",
    "pinyin": "chí",
    "teochewIPA": "sî⁵",
    "teochewAudio": "/audio/si5.mp3",
    "triggerName": "白瓷汤匙",
    "imageUrl": "/images/items/spoon.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 220,179 L 235,191 L 240,203 L 262,347",
        "length": 178
      },
      {
        "name": "二笔",
        "path": "M 254,183 L 263,185 L 350,165 L 367,169 L 383,185 L 367,286 L 356,324 L 360,337",
        "length": 294
      },
      {
        "name": "三笔",
        "path": "M 271,264 L 275,256 L 283,253 L 306,249 L 327,251",
        "length": 62
      },
      {
        "name": "四笔",
        "path": "M 276,336 L 281,326 L 327,318 L 341,309",
        "length": 75
      },
      {
        "name": "五笔",
        "path": "M 102,422 L 123,428 L 144,428 L 383,380 L 422,383",
        "length": 326
      },
      {
        "name": "六笔",
        "path": "M 296,412 L 316,429 L 313,543 L 325,561",
        "length": 162
      },
      {
        "name": "七笔",
        "path": "M 335,488 L 346,482 L 406,469 L 427,470",
        "length": 95
      },
      {
        "name": "八笔",
        "path": "M 206,458 L 223,480 L 200,538 L 175,578 L 149,609 L 109,644",
        "length": 231
      },
      {
        "name": "九笔",
        "path": "M 236,515 L 244,533 L 319,582 L 410,634 L 493,669 L 533,682 L 556,685 L 698,664",
        "length": 513
      },
      {
        "name": "十笔",
        "path": "M 599,270 L 612,297 L 564,339 L 508,375 L 501,387",
        "length": 174
      },
      {
        "name": "十一笔",
        "path": "M 461,183 L 479,195 L 493,214 L 484,318 L 483,417 L 487,471 L 496,497 L 513,513 L 537,524 L 580,526 L 615,520 L 631,509 L 643,433",
        "length": 555
      }
    ]
  },
  "morning": {
    "id": "morning",
    "character": "早",
    "pinyin": "zǎo",
    "teochewIPA": "tsá²",
    "teochewAudio": "/audio/tsa2.mp3",
    "triggerName": "早起开饭",
    "imageUrl": "/images/items/morning.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 255,177 L 278,194 L 288,211 L 308,308 L 324,352",
        "length": 194
      },
      {
        "name": "二笔",
        "path": "M 291,183 L 313,188 L 376,175 L 462,165 L 496,166 L 505,172 L 522,194 L 505,234 L 476,336",
        "length": 396
      },
      {
        "name": "三笔",
        "path": "M 322,272 L 328,266 L 384,253 L 428,247 L 442,251",
        "length": 125
      },
      {
        "name": "四笔",
        "path": "M 337,344 L 343,338 L 448,323 L 461,316",
        "length": 129
      },
      {
        "name": "五笔",
        "path": "M 133,450 L 174,462 L 333,440 L 611,416 L 629,419 L 667,434",
        "length": 541
      },
      {
        "name": "六笔",
        "path": "M 366,345 L 394,365 L 396,371 L 393,685",
        "length": 355
      }
    ]
  }
}
};
