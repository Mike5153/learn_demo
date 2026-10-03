import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：房内起居 (针线寝居)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const bedroomSceneConfig: SceneConfig = {
  id: 'bedroom',
  name: '房内起居',
  subtitle: '针线寝居',
  icon: '🛏️',
  hintText: '👆 点房内物事识字',
  backText: '卧房',
  liquidType: 'water',
  defaultWordId: 'bed',
  words: {
  "bed": {
    "id": "bed",
    "character": "床",
    "pinyin": "chuáng",
    "teochewIPA": "tshn̂g⁵",
    "teochewAudio": "/audio/tshurng5.mp3",
    "triggerName": "架子床",
    "imageUrl": "/images/items/bed.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 364,165 L 414,193 L 430,216",
        "length": 85
      },
      {
        "name": "二笔",
        "path": "M 292,279 L 311,287 L 334,286 L 441,270 L 501,256 L 525,253 L 546,255",
        "length": 259
      },
      {
        "name": "三笔",
        "path": "M 256,269 L 274,289 L 276,300 L 261,397 L 235,495 L 220,532 L 185,595 L 156,634 L 129,662",
        "length": 437
      },
      {
        "name": "四笔",
        "path": "M 305,415 L 336,419 L 507,383 L 534,381 L 554,385",
        "length": 253
      },
      {
        "name": "五笔",
        "path": "M 398,307 L 413,320 L 426,336 L 416,685",
        "length": 390
      },
      {
        "name": "六笔",
        "path": "M 405,422 L 400,428 L 391,456 L 347,520 L 291,574 L 246,602",
        "length": 246
      },
      {
        "name": "七笔",
        "path": "M 440,436 L 447,450 L 475,483 L 524,534 L 565,572 L 599,583 L 671,594",
        "length": 294
      }
    ]
  },
  "quilt": {
    "id": "quilt",
    "character": "被",
    "pinyin": "bèi",
    "teochewIPA": "phuê⁷",
    "teochewAudio": "/audio/pi6.mp3",
    "triggerName": "棉花被",
    "imageUrl": "/images/items/quilt.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 246,184 L 301,222 L 315,248",
        "length": 96
      },
      {
        "name": "二笔",
        "path": "M 122,360 L 157,368 L 201,357 L 254,338 L 283,340 L 278,366 L 223,458 L 177,516 L 144,549 L 116,571",
        "length": 457
      },
      {
        "name": "三笔",
        "path": "M 241,460 L 244,479 L 250,491 L 248,558 L 238,654 L 242,685",
        "length": 227
      },
      {
        "name": "四笔",
        "path": "M 324,399 L 334,415 L 310,449 L 305,449",
        "length": 65
      },
      {
        "name": "五笔",
        "path": "M 285,456 L 319,478 L 332,497",
        "length": 64
      },
      {
        "name": "六笔",
        "path": "M 414,326 L 428,332 L 550,299 L 579,296 L 600,310 L 572,353",
        "length": 247
      },
      {
        "name": "七笔",
        "path": "M 372,319 L 394,335 L 398,349 L 399,406 L 389,501 L 370,560 L 347,600 L 317,635 L 282,660",
        "length": 392
      },
      {
        "name": "八笔",
        "path": "M 467,165 L 490,184 L 496,199 L 485,407 L 485,413 L 474,426",
        "length": 277
      },
      {
        "name": "九笔",
        "path": "M 416,446 L 474,442 L 515,429 L 538,431 L 550,437 L 527,517 L 493,578 L 444,620 L 421,631 L 378,641",
        "length": 425
      },
      {
        "name": "十笔",
        "path": "M 429,481 L 449,489 L 531,586 L 597,647 L 684,659",
        "length": 326
      }
    ]
  },
  "clothes": {
    "id": "clothes",
    "character": "衣",
    "pinyin": "yī",
    "teochewIPA": "i¹",
    "teochewAudio": "/audio/ui1.mp3",
    "triggerName": "唐装布衣",
    "imageUrl": "/images/items/clothes.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 347,165 L 418,202 L 437,227",
        "length": 111
      },
      {
        "name": "二笔",
        "path": "M 194,332 L 221,338 L 257,336 L 413,307 L 535,278 L 575,277",
        "length": 388
      },
      {
        "name": "三笔",
        "path": "M 332,343 L 350,361 L 350,365 L 323,410 L 288,455 L 235,510 L 175,564 L 106,608",
        "length": 378
      },
      {
        "name": "四笔",
        "path": "M 309,464 L 323,498 L 317,656 L 323,685 L 357,672 L 440,607",
        "length": 366
      },
      {
        "name": "五笔",
        "path": "M 538,375 L 553,400 L 473,483 L 464,498",
        "length": 162
      },
      {
        "name": "六笔",
        "path": "M 354,401 L 364,402 L 379,415 L 469,530 L 554,610 L 585,625 L 694,642",
        "length": 437
      }
    ]
  },
  "needle": {
    "id": "needle",
    "character": "针",
    "pinyin": "zhēn",
    "teochewIPA": "tsiam¹",
    "teochewAudio": "/audio/tsam1.mp3",
    "triggerName": "缝衣针",
    "imageUrl": "/images/items/needle.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 300,165 L 315,179 L 321,194 L 286,260 L 254,312 L 207,373 L 167,418 L 144,436",
        "length": 339
      },
      {
        "name": "二笔",
        "path": "M 288,289 L 359,269 L 403,264",
        "length": 118
      },
      {
        "name": "三笔",
        "path": "M 237,375 L 268,375 L 347,349 L 373,347",
        "length": 140
      },
      {
        "name": "四笔",
        "path": "M 199,469 L 213,472 L 241,469 L 320,448 L 352,435 L 384,435",
        "length": 191
      },
      {
        "name": "五笔",
        "path": "M 279,389 L 300,403 L 302,484 L 293,564 L 296,578 L 326,572 L 394,530",
        "length": 312
      },
      {
        "name": "六笔",
        "path": "M 394,396 L 407,400 L 426,399 L 481,386 L 608,363 L 656,371",
        "length": 267
      },
      {
        "name": "七笔",
        "path": "M 482,184 L 497,188 L 519,208 L 514,404 L 517,685",
        "length": 522
      }
    ]
  },
  "thread": {
    "id": "thread",
    "character": "线",
    "pinyin": "xiàn",
    "teochewIPA": "suã³",
    "teochewAudio": "/audio/sua~3.mp3",
    "triggerName": "彩线轴",
    "imageUrl": "/images/items/thread.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 239,173 L 249,183 L 258,205 L 184,335 L 157,373 L 153,388 L 169,391 L 219,389 L 241,384 L 246,379",
        "length": 346
      },
      {
        "name": "二笔",
        "path": "M 304,282 L 317,306 L 274,371 L 196,465 L 191,491 L 213,492 L 313,459",
        "length": 381
      },
      {
        "name": "三笔",
        "path": "M 132,617 L 172,621 L 333,526",
        "length": 227
      },
      {
        "name": "四笔",
        "path": "M 362,344 L 376,347 L 410,344 L 504,312 L 528,308 L 545,310",
        "length": 189
      },
      {
        "name": "五笔",
        "path": "M 347,444 L 383,446 L 528,403 L 569,395 L 591,397",
        "length": 251
      },
      {
        "name": "六笔",
        "path": "M 391,165 L 413,174 L 430,191 L 440,295 L 452,366 L 479,467 L 505,538 L 553,621 L 585,657 L 617,680 L 639,685 L 647,670 L 659,624 L 668,561",
        "length": 739
      },
      {
        "name": "七笔",
        "path": "M 560,442 L 569,463 L 567,474 L 546,511 L 510,559 L 478,590 L 446,612 L 391,643 L 350,657",
        "length": 326
      },
      {
        "name": "八笔",
        "path": "M 499,180 L 549,213 L 569,241",
        "length": 94
      }
    ]
  },
  "comb": {
    "id": "comb",
    "character": "梳",
    "pinyin": "shū",
    "teochewIPA": "se¹",
    "teochewAudio": "/audio/siu1.mp3",
    "triggerName": "黄杨木梳",
    "imageUrl": "/images/items/comb.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 137,361 L 171,363 L 296,327 L 333,326",
        "length": 201
      },
      {
        "name": "二笔",
        "path": "M 247,165 L 265,181 L 279,200 L 280,206 L 265,548 L 256,627 L 256,685",
        "length": 534
      },
      {
        "name": "三笔",
        "path": "M 257,361 L 251,365 L 241,416 L 214,469 L 170,534 L 124,589",
        "length": 269
      },
      {
        "name": "四笔",
        "path": "M 286,418 L 297,432 L 322,449 L 332,469",
        "length": 70
      },
      {
        "name": "五笔",
        "path": "M 435,173 L 489,203 L 506,224",
        "length": 89
      },
      {
        "name": "六笔",
        "path": "M 371,297 L 390,301 L 413,301 L 572,269 L 593,270",
        "length": 226
      },
      {
        "name": "七笔",
        "path": "M 473,328 L 453,332 L 434,370 L 406,407 L 399,427 L 417,429 L 522,402 L 541,403",
        "length": 276
      },
      {
        "name": "八笔",
        "path": "M 520,356 L 562,398 L 572,417 L 575,434",
        "length": 98
      },
      {
        "name": "九笔",
        "path": "M 364,500 L 371,503 L 385,524 L 373,583 L 362,606 L 347,626 L 325,646 L 298,660",
        "length": 204
      },
      {
        "name": "十笔",
        "path": "M 448,489 L 464,513 L 460,622 L 464,650",
        "length": 166
      },
      {
        "name": "十一笔",
        "path": "M 522,460 L 540,480 L 535,563 L 539,608 L 544,622 L 561,640 L 573,647 L 606,653 L 635,651 L 661,640 L 670,631 L 676,553",
        "length": 391
      }
    ]
  },
  "cloth": {
    "id": "cloth",
    "character": "布",
    "pinyin": "bù",
    "teochewIPA": "pò³",
    "teochewAudio": "/audio/pou3.mp3",
    "triggerName": "花布匹",
    "imageUrl": "/images/items/cloth.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 211,294 L 242,299 L 425,268 L 565,253 L 589,254 L 625,263",
        "length": 419
      },
      {
        "name": "二笔",
        "path": "M 376,165 L 391,196 L 388,206 L 356,291 L 315,370 L 285,415 L 242,465 L 206,496 L 175,516",
        "length": 429
      },
      {
        "name": "三笔",
        "path": "M 322,396 L 322,477 L 313,526 L 314,552",
        "length": 157
      },
      {
        "name": "四笔",
        "path": "M 337,399 L 346,406 L 352,406 L 513,379 L 535,380 L 548,398 L 546,484 L 540,519 L 532,529 L 528,528 L 476,497",
        "length": 424
      },
      {
        "name": "五笔",
        "path": "M 402,318 L 413,324 L 427,343 L 423,685",
        "length": 378
      }
    ]
  },
  "scissors": {
    "id": "scissors",
    "character": "剪",
    "pinyin": "jiǎn",
    "teochewIPA": "tsíⁿ²",
    "teochewAudio": "/audio/tsieng2.mp3",
    "triggerName": "裁缝铁剪",
    "imageUrl": "/images/items/scissors.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 316,192 L 352,219 L 361,232",
        "length": 61
      },
      {
        "name": "二笔",
        "path": "M 461,165 L 473,176 L 477,186 L 440,237 L 427,242",
        "length": 104
      },
      {
        "name": "三笔",
        "path": "M 183,282 L 212,288 L 341,268 L 570,245 L 589,247 L 617,257",
        "length": 439
      },
      {
        "name": "四笔",
        "path": "M 251,323 L 263,335 L 267,364 L 257,482",
        "length": 165
      },
      {
        "name": "五笔",
        "path": "M 280,336 L 286,329 L 353,313 L 363,316 L 374,325 L 373,430 L 369,449 L 360,460 L 321,445",
        "length": 283
      },
      {
        "name": "六笔",
        "path": "M 281,379 L 284,373 L 311,367 L 331,369",
        "length": 54
      },
      {
        "name": "七笔",
        "path": "M 280,421 L 284,415 L 308,409 L 333,410",
        "length": 57
      },
      {
        "name": "八笔",
        "path": "M 429,323 L 441,337 L 443,432",
        "length": 113
      },
      {
        "name": "九笔",
        "path": "M 510,287 L 527,310 L 528,424 L 518,444 L 501,440 L 476,428",
        "length": 210
      },
      {
        "name": "十笔",
        "path": "M 248,522 L 279,529 L 465,501 L 490,499 L 500,504 L 509,513 L 501,571 L 488,623 L 476,646 L 457,664 L 440,657 L 406,635",
        "length": 492
      },
      {
        "name": "十一笔",
        "path": "M 360,532 L 372,550 L 344,592 L 311,625 L 280,648 L 241,669 L 205,683 L 190,685",
        "length": 255
      }
    ]
  },
  "mend": {
    "id": "mend",
    "character": "补",
    "pinyin": "bǔ",
    "teochewIPA": "pó²",
    "teochewAudio": "/audio/pou2.mp3",
    "triggerName": "缝衣补裳",
    "imageUrl": "/images/items/mend.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 292,165 L 351,195 L 371,219",
        "length": 97
      },
      {
        "name": "二笔",
        "path": "M 167,336 L 198,343 L 250,327 L 310,301 L 333,301 L 341,305 L 330,336 L 254,441 L 211,484 L 177,513 L 146,533",
        "length": 488
      },
      {
        "name": "三笔",
        "path": "M 282,430 L 285,450 L 294,469 L 291,541 L 284,610 L 287,656",
        "length": 229
      },
      {
        "name": "四笔",
        "path": "M 383,373 L 392,388 L 363,429",
        "length": 68
      },
      {
        "name": "五笔",
        "path": "M 338,422 L 364,446 L 388,476",
        "length": 74
      },
      {
        "name": "六笔",
        "path": "M 462,171 L 485,192 L 496,211 L 495,464 L 487,626 L 489,685",
        "length": 527
      },
      {
        "name": "七笔",
        "path": "M 509,360 L 518,363 L 521,370 L 580,396 L 620,417 L 636,429 L 654,454",
        "length": 178
      }
    ]
  },
  "towel": {
    "id": "towel",
    "character": "巾",
    "pinyin": "jīn",
    "teochewIPA": "keng¹",
    "teochewAudio": "/audio/kurng1.mp3",
    "triggerName": "洗脸毛巾",
    "imageUrl": "/images/items/towel.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 246,315 L 263,329 L 269,357 L 268,423 L 260,489 L 259,525",
        "length": 219
      },
      {
        "name": "二笔",
        "path": "M 283,322 L 293,328 L 467,301 L 510,296 L 539,301 L 551,311 L 553,318 L 554,468 L 541,492 L 474,471",
        "length": 531
      },
      {
        "name": "三笔",
        "path": "M 375,165 L 383,165 L 398,174 L 415,192 L 409,296 L 404,685",
        "length": 543
      }
    ]
  },
  "mirror": {
    "id": "mirror",
    "character": "镜",
    "pinyin": "jìng",
    "teochewIPA": "kiã³",
    "teochewAudio": "/audio/kia~3.mp3",
    "triggerName": "铜面镜",
    "imageUrl": "/images/items/mirror.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 284,183 L 299,198 L 306,212 L 268,284 L 238,331 L 189,396 L 152,438 L 128,457",
        "length": 342
      },
      {
        "name": "二笔",
        "path": "M 271,311 L 355,288 L 374,289",
        "length": 106
      },
      {
        "name": "三笔",
        "path": "M 222,395 L 253,395 L 310,377 L 340,374",
        "length": 121
      },
      {
        "name": "四笔",
        "path": "M 181,484 L 224,485 L 293,469 L 327,457 L 359,456",
        "length": 182
      },
      {
        "name": "五笔",
        "path": "M 246,408 L 268,424 L 271,433 L 274,513 L 266,580 L 270,599 L 290,594 L 354,546",
        "length": 304
      },
      {
        "name": "六笔",
        "path": "M 454,165 L 495,186 L 516,209",
        "length": 77
      },
      {
        "name": "七笔",
        "path": "M 419,257 L 435,260 L 468,256 L 562,234 L 586,234",
        "length": 170
      },
      {
        "name": "八笔",
        "path": "M 421,293 L 441,314 L 451,330",
        "length": 48
      },
      {
        "name": "九笔",
        "path": "M 530,261 L 542,269 L 544,276 L 515,339 L 507,347",
        "length": 102
      },
      {
        "name": "十笔",
        "path": "M 365,377 L 386,381 L 401,379 L 448,368 L 597,345 L 627,347 L 646,353",
        "length": 286
      },
      {
        "name": "十一笔",
        "path": "M 397,415 L 408,426 L 415,441 L 429,529 L 425,534",
        "length": 128
      },
      {
        "name": "十二笔",
        "path": "M 419,416 L 433,420 L 529,400 L 560,403 L 574,421 L 548,514",
        "length": 263
      },
      {
        "name": "十三笔",
        "path": "M 438,476 L 441,471 L 488,459 L 515,460",
        "length": 81
      },
      {
        "name": "十四笔",
        "path": "M 441,524 L 460,516 L 514,506 L 526,505 L 532,511",
        "length": 96
      },
      {
        "name": "十五笔",
        "path": "M 430,544 L 437,549 L 441,563 L 426,593 L 402,625 L 357,663 L 311,685",
        "length": 207
      },
      {
        "name": "十六笔",
        "path": "M 494,524 L 510,535 L 507,597 L 511,647 L 522,665 L 538,675 L 565,681 L 602,683 L 651,670 L 668,654 L 672,586",
        "length": 378
      }
    ]
  },
  "shoes": {
    "id": "shoes",
    "character": "鞋",
    "pinyin": "xié",
    "teochewIPA": "oi⁵",
    "teochewAudio": "/audio/oi5.mp3",
    "triggerName": "千层底鞋",
    "imageUrl": "/images/items/shoes.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 164,286 L 198,289 L 363,256 L 394,259",
        "length": 234
      },
      {
        "name": "二笔",
        "path": "M 211,209 L 221,213 L 235,227 L 252,357",
        "length": 162
      },
      {
        "name": "三笔",
        "path": "M 327,165 L 346,190 L 326,303 L 315,315",
        "length": 162
      },
      {
        "name": "四笔",
        "path": "M 263,345 L 273,337 L 310,329 L 341,331",
        "length": 82
      },
      {
        "name": "五笔",
        "path": "M 182,411 L 196,421 L 204,437 L 223,510",
        "length": 111
      },
      {
        "name": "六笔",
        "path": "M 212,413 L 220,417 L 261,410 L 320,391 L 341,388 L 354,393 L 366,405 L 354,444 L 341,451",
        "length": 220
      },
      {
        "name": "七笔",
        "path": "M 229,500 L 242,492 L 335,470 L 360,467 L 373,470",
        "length": 149
      },
      {
        "name": "八笔",
        "path": "M 133,566 L 165,572 L 358,530 L 391,531",
        "length": 263
      },
      {
        "name": "九笔",
        "path": "M 264,351 L 278,360 L 282,371 L 276,611 L 281,685",
        "length": 343
      },
      {
        "name": "十笔",
        "path": "M 427,325 L 441,329 L 465,328 L 553,306 L 591,304",
        "length": 167
      },
      {
        "name": "十一笔",
        "path": "M 482,167 L 503,183 L 510,195 L 505,384 L 495,397",
        "length": 246
      },
      {
        "name": "十二笔",
        "path": "M 408,423 L 426,424 L 590,396 L 611,396 L 636,402",
        "length": 231
      },
      {
        "name": "十三笔",
        "path": "M 425,510 L 437,513 L 471,512 L 557,491 L 593,491",
        "length": 171
      },
      {
        "name": "十四笔",
        "path": "M 484,425 L 499,435 L 505,444 L 503,574 L 501,581 L 493,588",
        "length": 177
      },
      {
        "name": "十五笔",
        "path": "M 369,615 L 402,619 L 522,600 L 621,590 L 667,600",
        "length": 301
      }
    ]
  },
  "peace": {
    "id": "peace",
    "character": "安",
    "pinyin": "ān",
    "teochewIPA": "an¹",
    "teochewAudio": "/audio/ang1.mp3",
    "triggerName": "安宁静歇",
    "imageUrl": "/images/items/peace.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 364,165 L 406,191 L 425,214",
        "length": 79
      },
      {
        "name": "二笔",
        "path": "M 247,273 L 252,283 L 253,302 L 232,350 L 228,387",
        "length": 120
      },
      {
        "name": "三笔",
        "path": "M 273,307 L 280,300 L 357,281 L 495,262 L 502,259 L 537,259 L 553,271 L 558,285 L 507,341 L 501,344",
        "length": 388
      },
      {
        "name": "四笔",
        "path": "M 359,341 L 369,351 L 378,370 L 319,523 L 330,533 L 427,579 L 500,624 L 528,646 L 560,685",
        "length": 493
      },
      {
        "name": "五笔",
        "path": "M 435,419 L 455,438 L 450,474 L 428,533 L 394,583 L 362,613 L 316,638 L 272,652 L 228,658",
        "length": 374
      },
      {
        "name": "六笔",
        "path": "M 132,483 L 171,493 L 311,468 L 617,431 L 668,447",
        "length": 544
      }
    ]
  }
}
};
