import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：园头田埂 (菜园劳作)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const farmSceneConfig: SceneConfig = {
  id: 'farm',
  name: '园头田埂',
  subtitle: '菜园劳作',
  icon: '🌱',
  hintText: '👆 点菜园物事识字',
  backText: '菜园',
  liquidType: 'water',
  defaultWordId: 'field',
  words: {
  "field": {
    "id": "field",
    "character": "田",
    "pinyin": "tián",
    "teochewIPA": "tshân⁵",
    "teochewAudio": "/audio/thieng5.mp3",
    "triggerName": "方格田畦",
    "imageUrl": "/images/items/field.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 100,206 L 133,234 L 152,268 L 178,457 L 190,616 L 207,670",
        "length": 489
      },
      {
        "name": "二笔",
        "path": "M 160,217 L 200,234 L 421,204 L 623,165 L 652,165 L 683,183 L 700,203 L 672,416 L 643,568 L 630,604 L 611,629 L 610,685",
        "length": 1059
      },
      {
        "name": "三笔",
        "path": "M 263,425 L 297,425 L 497,392 L 534,390 L 555,396",
        "length": 296
      },
      {
        "name": "四笔",
        "path": "M 375,226 L 407,250 L 406,554 L 389,575",
        "length": 371
      },
      {
        "name": "五笔",
        "path": "M 225,627 L 239,614 L 306,606 L 500,586 L 584,585",
        "length": 366
      }
    ]
  },
  "ox": {
    "id": "ox",
    "character": "牛",
    "pinyin": "niú",
    "teochewIPA": "ngû⁵",
    "teochewAudio": "/audio/gu5.mp3",
    "triggerName": "耕地水牛",
    "imageUrl": "/images/items/ox.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 280,243 L 299,267 L 293,283 L 267,333 L 242,365 L 218,387",
        "length": 177
      },
      {
        "name": "二笔",
        "path": "M 296,325 L 346,323 L 429,308 L 493,290 L 526,291",
        "length": 234
      },
      {
        "name": "三笔",
        "path": "M 165,465 L 186,470 L 205,470 L 345,445 L 578,417 L 613,422 L 635,430",
        "length": 476
      },
      {
        "name": "四笔",
        "path": "M 375,165 L 385,166 L 399,175 L 413,192 L 406,361 L 402,685",
        "length": 542
      }
    ]
  },
  "grass": {
    "id": "grass",
    "character": "草",
    "pinyin": "cǎo",
    "teochewIPA": "tsháu²",
    "teochewAudio": "/audio/tshau2.mp3",
    "triggerName": "垄边杂草",
    "imageUrl": "/images/items/grass.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 221,254 L 272,257 L 363,244 L 422,241 L 501,231 L 535,232 L 566,242",
        "length": 348
      },
      {
        "name": "二笔",
        "path": "M 303,192 L 316,198 L 328,209 L 345,297",
        "length": 120
      },
      {
        "name": "三笔",
        "path": "M 443,165 L 452,171 L 463,189 L 444,250 L 426,293",
        "length": 142
      },
      {
        "name": "四笔",
        "path": "M 268,330 L 285,342 L 290,355 L 316,462",
        "length": 145
      },
      {
        "name": "五笔",
        "path": "M 300,331 L 313,338 L 451,319 L 486,323 L 503,345 L 489,377 L 466,449",
        "length": 328
      },
      {
        "name": "六笔",
        "path": "M 319,395 L 324,391 L 402,377 L 417,376 L 430,380",
        "length": 114
      },
      {
        "name": "七笔",
        "path": "M 329,444 L 334,447 L 353,446 L 438,433 L 452,439",
        "length": 126
      },
      {
        "name": "八笔",
        "path": "M 179,532 L 211,539 L 334,522 L 560,505 L 593,509 L 621,519",
        "length": 447
      },
      {
        "name": "九笔",
        "path": "M 364,454 L 390,472 L 388,685",
        "length": 245
      }
    ]
  },
  "plant_seed": {
    "id": "plant_seed",
    "character": "种",
    "pinyin": "zhòng",
    "teochewIPA": "tsìng³",
    "teochewAudio": "/audio/tshong1.mp3",
    "triggerName": "播撒菜籽",
    "imageUrl": "/images/items/plant_seed.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 388,205 L 344,202 L 304,232 L 263,257 L 241,264 L 236,270 L 227,270 L 224,275 L 211,277 L 205,283 L 195,283 L 187,290",
        "length": 230
      },
      {
        "name": "二笔",
        "path": "M 165,384 L 203,386 L 332,348 L 366,348",
        "length": 207
      },
      {
        "name": "三笔",
        "path": "M 279,262 L 293,271 L 299,282 L 294,494 L 287,591 L 295,649",
        "length": 397
      },
      {
        "name": "四笔",
        "path": "M 281,381 L 275,387 L 263,430 L 226,490 L 152,578",
        "length": 239
      },
      {
        "name": "五笔",
        "path": "M 311,431 L 347,451 L 365,471",
        "length": 68
      },
      {
        "name": "六笔",
        "path": "M 388,336 L 405,350 L 409,360 L 435,480",
        "length": 156
      },
      {
        "name": "七笔",
        "path": "M 424,338 L 435,345 L 442,345 L 601,313 L 629,313 L 648,335 L 628,403 L 613,409",
        "length": 326
      },
      {
        "name": "八笔",
        "path": "M 447,466 L 457,457 L 601,432 L 634,433 L 648,438",
        "length": 207
      },
      {
        "name": "九笔",
        "path": "M 488,165 L 504,169 L 527,190 L 521,314 L 520,685",
        "length": 543
      }
    ]
  },
  "melon": {
    "id": "melon",
    "character": "瓜",
    "pinyin": "guā",
    "teochewIPA": "kue¹",
    "teochewAudio": "/audio/kue1.mp3",
    "triggerName": "篱架青瓜",
    "imageUrl": "/images/items/melon.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 510,176 L 459,165 L 384,209 L 301,243 L 276,249 L 274,253",
        "length": 259
      },
      {
        "name": "二笔",
        "path": "M 215,240 L 228,247 L 246,268 L 244,396 L 237,460 L 228,503 L 207,561 L 171,618 L 128,663 L 94,685",
        "length": 511
      },
      {
        "name": "三笔",
        "path": "M 338,244 L 362,257 L 370,274 L 375,419 L 362,605 L 366,625 L 399,615 L 451,579 L 458,567",
        "length": 510
      },
      {
        "name": "四笔",
        "path": "M 444,522 L 494,578 L 506,599 L 511,621",
        "length": 122
      },
      {
        "name": "五笔",
        "path": "M 400,279 L 423,306 L 512,448 L 572,525 L 598,543 L 706,575",
        "length": 445
      }
    ]
  },
  "pick_fruit": {
    "id": "pick_fruit",
    "character": "摘",
    "pinyin": "zhāi",
    "teochewIPA": "tiah⁴",
    "teochewAudio": "/audio/tiah4.mp3",
    "triggerName": "伸手采摘",
    "imageUrl": "/images/items/pick_fruit.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 190,361 L 225,361 L 293,343 L 327,329 L 367,324",
        "length": 182
      },
      {
        "name": "二笔",
        "path": "M 278,175 L 294,186 L 307,201 L 298,431 L 298,621 L 294,640 L 284,658 L 264,651 L 219,626 L 219,621 L 212,621",
        "length": 584
      },
      {
        "name": "三笔",
        "path": "M 141,537 L 155,540 L 173,538 L 342,418",
        "length": 240
      },
      {
        "name": "四笔",
        "path": "M 486,165 L 540,197 L 554,220",
        "length": 90
      },
      {
        "name": "五笔",
        "path": "M 394,296 L 417,301 L 614,264 L 632,262 L 659,266",
        "length": 269
      },
      {
        "name": "六笔",
        "path": "M 433,335 L 450,352 L 464,377",
        "length": 53
      },
      {
        "name": "七笔",
        "path": "M 557,292 L 569,303 L 573,316 L 546,369 L 527,390",
        "length": 118
      },
      {
        "name": "八笔",
        "path": "M 376,409 L 393,423 L 399,460 L 397,549 L 380,671",
        "length": 272
      },
      {
        "name": "九笔",
        "path": "M 412,415 L 420,421 L 429,420 L 618,381 L 629,383 L 646,397 L 650,404 L 650,617 L 646,666 L 637,685 L 608,677 L 565,659",
        "length": 613
      },
      {
        "name": "十笔",
        "path": "M 443,487 L 472,491 L 563,469 L 589,468",
        "length": 149
      },
      {
        "name": "十一笔",
        "path": "M 494,430 L 511,449 L 504,514 L 494,531",
        "length": 111
      },
      {
        "name": "十二笔",
        "path": "M 437,544 L 455,563 L 470,636",
        "length": 101
      },
      {
        "name": "十三笔",
        "path": "M 462,546 L 477,549 L 533,535 L 553,538 L 565,550 L 564,555 L 558,578 L 544,592",
        "length": 159
      },
      {
        "name": "十四笔",
        "path": "M 480,613 L 486,617 L 541,608 L 572,613",
        "length": 94
      }
    ]
  },
  "soil": {
    "id": "soil",
    "character": "土",
    "pinyin": "tǔ",
    "teochewIPA": "thô²",
    "teochewAudio": "/audio/thou2.mp3",
    "triggerName": "肥沃泥土",
    "imageUrl": "/images/items/soil.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 213,414 L 235,420 L 287,420 L 369,408 L 529,376 L 567,377",
        "length": 359
      },
      {
        "name": "二笔",
        "path": "M 350,165 L 393,201 L 394,223 L 379,619 L 362,634",
        "length": 497
      },
      {
        "name": "三笔",
        "path": "M 94,676 L 139,685 L 286,663 L 626,632 L 663,637 L 706,653",
        "length": 619
      }
    ]
  },
  "ground": {
    "id": "ground",
    "character": "地",
    "pinyin": "dì",
    "teochewIPA": "tē⁷",
    "teochewAudio": "/audio/to3.mp3",
    "triggerName": "屋后自留地",
    "imageUrl": "/images/items/ground.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 120,445 L 161,443 L 264,406 L 302,401",
        "length": 189
      },
      {
        "name": "二笔",
        "path": "M 192,229 L 228,258 L 229,272 L 224,565 L 212,582",
        "length": 374
      },
      {
        "name": "三笔",
        "path": "M 100,637 L 141,643 L 311,550",
        "length": 235
      },
      {
        "name": "四笔",
        "path": "M 274,493 L 318,489 L 464,414 L 553,361 L 585,351 L 602,360 L 593,426 L 571,532 L 559,546 L 552,546 L 502,521",
        "length": 621
      },
      {
        "name": "五笔",
        "path": "M 440,165 L 457,176 L 473,194 L 475,220 L 469,382 L 450,571",
        "length": 422
      },
      {
        "name": "六笔",
        "path": "M 340,329 L 356,344 L 361,358 L 356,516 L 365,584 L 384,628 L 425,659 L 486,680 L 528,685 L 601,680 L 660,661 L 695,630 L 700,502",
        "length": 780
      }
    ]
  },
  "irrigation": {
    "id": "irrigation",
    "character": "水",
    "pinyin": "shuǐ",
    "teochewIPA": "zui²",
    "teochewAudio": "/audio/tsui2.mp3",
    "triggerName": "灌溉清流",
    "imageUrl": "/images/items/irrigation.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 347,165 L 365,178 L 379,195 L 371,407 L 370,652 L 355,685 L 326,676 L 278,652 L 277,647 L 270,647",
        "length": 634
      },
      {
        "name": "二笔",
        "path": "M 128,383 L 169,389 L 267,368 L 285,373 L 293,380 L 287,404 L 266,453 L 217,537 L 154,606 L 105,639",
        "length": 499
      },
      {
        "name": "三笔",
        "path": "M 525,254 L 534,261 L 544,284 L 514,321 L 427,403 L 426,409",
        "length": 210
      },
      {
        "name": "四笔",
        "path": "M 392,377 L 399,400 L 445,453 L 520,531 L 555,559 L 581,574 L 695,589",
        "length": 392
      }
    ]
  },
  "pour_water": {
    "id": "pour_water",
    "character": "浇",
    "pinyin": "jiāo",
    "teochewIPA": "ak⁴",
    "teochewAudio": "/audio/nau1.mp3",
    "triggerName": "提勺浇菜",
    "imageUrl": "/images/items/pour_water.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 193,193 L 246,228 L 264,254",
        "length": 95
      },
      {
        "name": "二笔",
        "path": "M 139,322 L 190,358 L 205,378",
        "length": 87
      },
      {
        "name": "三笔",
        "path": "M 176,672 L 166,644 L 166,620 L 257,445",
        "length": 251
      },
      {
        "name": "四笔",
        "path": "M 304,286 L 320,288 L 356,282 L 406,268 L 500,232 L 538,227",
        "length": 244
      },
      {
        "name": "五笔",
        "path": "M 367,165 L 398,190 L 406,224 L 429,278 L 464,330 L 497,367 L 536,400 L 573,420 L 601,424 L 610,397 L 618,342",
        "length": 451
      },
      {
        "name": "六笔",
        "path": "M 522,275 L 527,294 L 524,304 L 496,337 L 460,371 L 392,410 L 314,430",
        "length": 282
      },
      {
        "name": "七笔",
        "path": "M 301,480 L 332,486 L 474,461 L 510,458 L 530,462",
        "length": 232
      },
      {
        "name": "八笔",
        "path": "M 342,503 L 358,516 L 362,526 L 353,563 L 334,611 L 312,639 L 291,658 L 237,685",
        "length": 245
      },
      {
        "name": "九笔",
        "path": "M 430,487 L 458,506 L 453,586 L 458,639 L 466,659 L 490,674 L 540,682 L 581,683 L 624,678 L 657,664 L 661,641 L 661,555",
        "length": 497
      }
    ]
  },
  "harvest": {
    "id": "harvest",
    "character": "收",
    "pinyin": "shōu",
    "teochewIPA": "siu¹",
    "teochewAudio": "/audio/siu1.mp3",
    "triggerName": "丰盛收获",
    "imageUrl": "/images/items/harvest.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 136,314 L 162,338 L 164,437 L 158,507 L 191,498 L 224,474 L 244,465 L 251,455",
        "length": 314
      },
      {
        "name": "二笔",
        "path": "M 239,189 L 258,205 L 272,224 L 267,526 L 257,629 L 258,685",
        "length": 510
      },
      {
        "name": "三笔",
        "path": "M 412,165 L 426,175 L 437,192 L 427,230 L 408,277 L 377,336 L 340,388",
        "length": 258
      },
      {
        "name": "四笔",
        "path": "M 380,359 L 430,352 L 567,310 L 590,310",
        "length": 217
      },
      {
        "name": "五笔",
        "path": "M 457,364 L 473,373 L 482,386 L 482,418 L 471,484 L 451,530 L 425,563 L 391,588 L 344,612 L 291,628",
        "length": 376
      },
      {
        "name": "六笔",
        "path": "M 332,426 L 357,438 L 370,449 L 473,569 L 534,618 L 664,645",
        "length": 414
      }
    ]
  },
  "sky": {
    "id": "sky",
    "character": "天",
    "pinyin": "tiān",
    "teochewIPA": "thiⁿ¹",
    "teochewAudio": "/audio/thi~1.mp3",
    "triggerName": "晴朗蓝天",
    "imageUrl": "/images/items/sky.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 243,201 L 261,206 L 300,206 L 483,169 L 516,165 L 536,167",
        "length": 298
      },
      {
        "name": "二笔",
        "path": "M 136,403 L 154,408 L 179,408 L 384,373 L 552,353 L 590,357 L 618,366",
        "length": 488
      },
      {
        "name": "三笔",
        "path": "M 325,226 L 359,241 L 364,248 L 346,418 L 334,465 L 315,515 L 293,553 L 254,595 L 160,647 L 103,665",
        "length": 587
      },
      {
        "name": "四笔",
        "path": "M 374,396 L 378,413 L 395,443 L 441,513 L 527,621 L 568,654 L 697,685",
        "length": 459
      }
    ]
  },
  "spring": {
    "id": "spring",
    "character": "春",
    "pinyin": "chūn",
    "teochewIPA": "tshun¹",
    "teochewAudio": "/audio/tshung1.mp3",
    "triggerName": "开春翻土",
    "imageUrl": "/images/items/spring.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 264,247 L 269,250 L 308,251 L 449,223 L 482,223",
        "length": 222
      },
      {
        "name": "二笔",
        "path": "M 255,317 L 279,321 L 311,319 L 366,311 L 445,291 L 471,293",
        "length": 220
      },
      {
        "name": "三笔",
        "path": "M 148,401 L 162,407 L 192,408 L 294,388 L 532,356 L 554,357 L 588,368",
        "length": 447
      },
      {
        "name": "四笔",
        "path": "M 345,165 L 361,177 L 369,190 L 368,196 L 348,307 L 332,361 L 319,390 L 278,455 L 245,490 L 222,510 L 192,529 L 144,553",
        "length": 487
      },
      {
        "name": "五笔",
        "path": "M 411,387 L 426,392 L 504,461 L 546,490 L 588,499 L 656,506",
        "length": 282
      },
      {
        "name": "六笔",
        "path": "M 276,483 L 288,490 L 296,506 L 298,553 L 289,634 L 291,665",
        "length": 191
      },
      {
        "name": "七笔",
        "path": "M 302,482 L 309,487 L 321,489 L 422,466 L 437,473 L 444,481 L 448,486 L 446,521 L 451,615 L 451,629 L 443,650 L 445,685",
        "length": 359
      },
      {
        "name": "八笔",
        "path": "M 311,572 L 320,565 L 358,558 L 381,557 L 394,560",
        "length": 86
      },
      {
        "name": "九笔",
        "path": "M 307,647 L 318,638 L 382,629 L 415,630",
        "length": 112
      }
    ]
  }
}
};
