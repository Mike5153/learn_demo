import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：做粿案台 (时节做粿)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const guo_tableSceneConfig: SceneConfig = {
  id: 'guo_table',
  name: '做粿案台',
  subtitle: '时节做粿',
  icon: '🥟',
  hintText: '👆 点案台物料识字',
  backText: '案台',
  liquidType: 'tea',
  defaultWordId: 'guo',
  words: {
  "guo": {
    "id": "guo",
    "character": "粿",
    "pinyin": "guǒ",
    "teochewIPA": "kué²",
    "teochewAudio": "/audio/kue2.mp3",
    "triggerName": "红桃粿",
    "imageUrl": "/images/items/guo.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 161,263 L 187,298 L 194,321",
        "length": 68
      },
      {
        "name": "二笔",
        "path": "M 287,211 L 293,224 L 295,237 L 287,256 L 256,310",
        "length": 110
      },
      {
        "name": "三笔",
        "path": "M 131,398 L 148,405 L 225,385 L 305,360 L 325,368",
        "length": 203
      },
      {
        "name": "四笔",
        "path": "M 216,165 L 224,178 L 232,200 L 229,491 L 224,680",
        "length": 519
      },
      {
        "name": "五笔",
        "path": "M 221,404 L 189,492 L 169,535 L 148,570 L 118,607",
        "length": 230
      },
      {
        "name": "六笔",
        "path": "M 236,400 L 241,423 L 253,454 L 287,526 L 304,556 L 317,572 L 363,585",
        "length": 239
      },
      {
        "name": "七笔",
        "path": "M 439,203 L 454,233 L 472,372",
        "length": 174
      },
      {
        "name": "八笔",
        "path": "M 450,199 L 466,209 L 564,184 L 578,185 L 586,190 L 595,213 L 575,332 L 572,341 L 563,343",
        "length": 308
      },
      {
        "name": "九笔",
        "path": "M 479,284 L 539,264 L 553,266",
        "length": 77
      },
      {
        "name": "十笔",
        "path": "M 479,358 L 495,349 L 559,330",
        "length": 85
      },
      {
        "name": "十一笔",
        "path": "M 403,440 L 417,446 L 427,445 L 474,432 L 611,408 L 629,411 L 642,419",
        "length": 247
      },
      {
        "name": "十二笔",
        "path": "M 512,209 L 521,222 L 521,685",
        "length": 479
      },
      {
        "name": "十三笔",
        "path": "M 510,439 L 482,507 L 452,562 L 430,590 L 395,623",
        "length": 220
      },
      {
        "name": "十四笔",
        "path": "M 531,436 L 534,440 L 537,456 L 555,491 L 590,550 L 613,582 L 643,599 L 682,612",
        "length": 244
      }
    ]
  },
  "mold": {
    "id": "mold",
    "character": "印",
    "pinyin": "yìn",
    "teochewIPA": "ìn³",
    "teochewAudio": "/audio/ing3.mp3",
    "triggerName": "木雕粿印",
    "imageUrl": "/images/items/mold.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 336,165 L 346,181 L 349,194 L 315,224 L 254,265 L 253,270",
        "length": 156
      },
      {
        "name": "二笔",
        "path": "M 204,254 L 218,265 L 229,284 L 234,373 L 228,487 L 245,486 L 263,477 L 363,420",
        "length": 395
      },
      {
        "name": "三笔",
        "path": "M 252,348 L 342,324 L 372,324",
        "length": 123
      },
      {
        "name": "四笔",
        "path": "M 450,277 L 470,283 L 538,263 L 566,259 L 583,263 L 596,276 L 583,411 L 574,449 L 563,463 L 503,436",
        "length": 414
      },
      {
        "name": "五笔",
        "path": "M 414,275 L 429,284 L 442,305 L 439,685",
        "length": 422
      }
    ]
  },
  "flour": {
    "id": "flour",
    "character": "粉",
    "pinyin": "fěn",
    "teochewIPA": "hún²",
    "teochewAudio": "/audio/hung2.mp3",
    "triggerName": "水磨糯米粉",
    "imageUrl": "/images/items/flour.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 171,283 L 207,327 L 214,350",
        "length": 81
      },
      {
        "name": "二笔",
        "path": "M 346,257 L 361,275 L 314,337",
        "length": 101
      },
      {
        "name": "三笔",
        "path": "M 109,421 L 142,426 L 291,389 L 328,385 L 342,387",
        "length": 238
      },
      {
        "name": "四笔",
        "path": "M 241,165 L 269,193 L 274,203 L 267,524 L 259,624 L 259,685",
        "length": 533
      },
      {
        "name": "五笔",
        "path": "M 252,416 L 240,458 L 220,493 L 168,563 L 136,599 L 130,600 L 130,604",
        "length": 229
      },
      {
        "name": "六笔",
        "path": "M 284,458 L 294,470 L 327,491 L 340,514",
        "length": 81
      },
      {
        "name": "七笔",
        "path": "M 411,307 L 418,312 L 428,330 L 416,358 L 395,394 L 365,434 L 343,453",
        "length": 180
      },
      {
        "name": "八笔",
        "path": "M 435,180 L 450,186 L 466,198 L 533,317 L 553,344 L 580,372 L 595,382 L 691,404",
        "length": 362
      },
      {
        "name": "九笔",
        "path": "M 383,458 L 417,461 L 482,443 L 541,433 L 550,436 L 559,446 L 541,574 L 531,605 L 517,632 L 498,649 L 452,627",
        "length": 453
      },
      {
        "name": "十笔",
        "path": "M 427,473 L 441,483 L 444,496 L 426,535 L 375,609 L 339,646 L 316,662",
        "length": 243
      }
    ]
  },
  "sugar": {
    "id": "sugar",
    "character": "糖",
    "pinyin": "táng",
    "teochewIPA": "thŋ̂⁵",
    "teochewAudio": "/audio/thurng5.mp3",
    "triggerName": "红糖老砖",
    "imageUrl": "/images/items/sugar.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 168,297 L 201,327 L 214,344",
        "length": 66
      },
      {
        "name": "二笔",
        "path": "M 323,264 L 334,278 L 294,330",
        "length": 83
      },
      {
        "name": "三笔",
        "path": "M 132,419 L 150,422 L 174,419 L 302,384 L 339,381",
        "length": 212
      },
      {
        "name": "四笔",
        "path": "M 236,180 L 265,211 L 257,464 L 259,472 L 255,567 L 248,631 L 248,685",
        "length": 517
      },
      {
        "name": "五笔",
        "path": "M 245,418 L 240,426 L 233,451 L 209,495 L 166,554 L 130,595",
        "length": 213
      },
      {
        "name": "六笔",
        "path": "M 272,451 L 306,479 L 317,495",
        "length": 63
      },
      {
        "name": "七笔",
        "path": "M 451,165 L 498,190 L 512,208",
        "length": 76
      },
      {
        "name": "八笔",
        "path": "M 416,275 L 426,279 L 448,278 L 586,247 L 605,247",
        "length": 193
      },
      {
        "name": "九笔",
        "path": "M 374,259 L 392,277 L 397,286 L 397,340 L 384,442 L 368,505 L 350,552 L 318,611 L 294,641",
        "length": 413
      },
      {
        "name": "十笔",
        "path": "M 426,370 L 456,370 L 565,342 L 585,347 L 596,359 L 572,445 L 560,454",
        "length": 284
      },
      {
        "name": "十一笔",
        "path": "M 421,432 L 447,432 L 470,426 L 614,402 L 654,403 L 670,408",
        "length": 253
      },
      {
        "name": "十二笔",
        "path": "M 424,489 L 434,492 L 461,488 L 560,469 L 581,468 L 593,472",
        "length": 172
      },
      {
        "name": "十三笔",
        "path": "M 482,301 L 494,307 L 506,320 L 505,404 L 496,538",
        "length": 249
      },
      {
        "name": "十四笔",
        "path": "M 402,561 L 422,580 L 445,676",
        "length": 126
      },
      {
        "name": "十五笔",
        "path": "M 439,576 L 451,569 L 493,563 L 559,546 L 571,546 L 593,567 L 576,614 L 560,626",
        "length": 237
      },
      {
        "name": "十六笔",
        "path": "M 456,662 L 474,654 L 553,642 L 586,641 L 599,646",
        "length": 147
      }
    ]
  },
  "red": {
    "id": "red",
    "character": "红",
    "pinyin": "hóng",
    "teochewIPA": "âng⁵",
    "teochewAudio": "/audio/ang5.mp3",
    "triggerName": "大红曲米",
    "imageUrl": "/images/items/red.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 215,165 L 226,175 L 239,208 L 203,280 L 131,402 L 128,419 L 170,423 L 229,418 L 243,408",
        "length": 408
      },
      {
        "name": "二笔",
        "path": "M 298,309 L 312,340 L 246,437 L 180,520 L 169,540 L 168,554 L 189,554 L 312,517",
        "length": 444
      },
      {
        "name": "三笔",
        "path": "M 92,681 L 99,684 L 141,685 L 337,572",
        "length": 276
      },
      {
        "name": "四笔",
        "path": "M 384,391 L 401,396 L 430,396 L 516,379 L 599,356 L 636,359",
        "length": 258
      },
      {
        "name": "五笔",
        "path": "M 483,407 L 504,424 L 509,436 L 496,569 L 478,585",
        "length": 198
      },
      {
        "name": "六笔",
        "path": "M 336,615 L 374,621 L 647,589 L 683,594 L 708,603",
        "length": 376
      }
    ]
  },
  "wrap": {
    "id": "wrap",
    "character": "包",
    "pinyin": "bāo",
    "teochewIPA": "pau¹",
    "teochewAudio": "/audio/pau1.mp3",
    "triggerName": "捏皮包馅",
    "imageUrl": "/images/items/wrap.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 302,165 L 313,176 L 323,197 L 312,220 L 255,302 L 202,358 L 181,375",
        "length": 268
      },
      {
        "name": "二笔",
        "path": "M 277,306 L 478,266 L 489,266 L 506,279 L 495,408 L 486,452 L 476,479 L 463,498 L 451,509 L 430,500 L 393,475",
        "length": 547
      },
      {
        "name": "三笔",
        "path": "M 239,406 L 244,399 L 307,379 L 323,375 L 333,379 L 348,392 L 332,447 L 316,454",
        "length": 197
      },
      {
        "name": "四笔",
        "path": "M 227,500 L 237,491 L 309,476 L 351,478",
        "length": 129
      },
      {
        "name": "五笔",
        "path": "M 202,386 L 214,399 L 219,414 L 209,529 L 214,603 L 223,627 L 233,640 L 260,659 L 281,667 L 325,678 L 405,685 L 476,679 L 555,659 L 587,642 L 610,622 L 619,524",
        "length": 764
      }
    ]
  },
  "bean": {
    "id": "bean",
    "character": "豆",
    "pinyin": "dòu",
    "teochewIPA": "tâu⁷",
    "teochewAudio": "/audio/tau7.mp3",
    "triggerName": "红豆甜馅",
    "imageUrl": "/images/items/bean.svg",
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
  "skin": {
    "id": "skin",
    "character": "皮",
    "pinyin": "pí",
    "teochewIPA": "phuê⁵",
    "teochewAudio": "/audio/phue5.mp3",
    "triggerName": "柔韧粿皮",
    "imageUrl": "/images/items/skin.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 288,343 L 298,331 L 499,284 L 530,282 L 544,287 L 557,300 L 517,368",
        "length": 365
      },
      {
        "name": "二笔",
        "path": "M 236,314 L 255,329 L 263,348 L 262,426 L 247,519 L 228,575 L 204,618 L 170,656 L 148,674 L 128,685",
        "length": 428
      },
      {
        "name": "三笔",
        "path": "M 376,165 L 407,191 L 400,411 L 389,428",
        "length": 281
      },
      {
        "name": "四笔",
        "path": "M 325,449 L 361,448 L 458,425 L 472,430 L 481,444 L 468,500 L 455,536 L 439,565 L 415,598 L 383,624 L 356,639 L 287,661 L 264,664",
        "length": 505
      },
      {
        "name": "五笔",
        "path": "M 306,491 L 320,491 L 349,505 L 380,531 L 446,598 L 488,632 L 535,663 L 569,674 L 672,685",
        "length": 430
      }
    ]
  },
  "steam_guo": {
    "id": "steam_guo",
    "character": "蒸",
    "pinyin": "zhēng",
    "teochewIPA": "tseng¹",
    "teochewAudio": "/audio/tseng1.mp3",
    "triggerName": "开锅大蒸",
    "imageUrl": "/images/items/steam_guo.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 191,274 L 195,277 L 236,277 L 332,261 L 402,254 L 491,240 L 538,240 L 564,248",
        "length": 378
      },
      {
        "name": "二笔",
        "path": "M 279,191 L 291,197 L 303,209 L 322,301",
        "length": 124
      },
      {
        "name": "三笔",
        "path": "M 428,165 L 435,169 L 446,186 L 427,252 L 411,289",
        "length": 137
      },
      {
        "name": "四笔",
        "path": "M 274,336 L 285,342 L 307,344 L 373,323 L 398,319 L 410,321 L 422,335 L 380,380 L 375,380",
        "length": 226
      },
      {
        "name": "五笔",
        "path": "M 342,382 L 362,390 L 375,406 L 383,434 L 383,474 L 373,501 L 363,510 L 312,492",
        "length": 208
      },
      {
        "name": "六笔",
        "path": "M 186,427 L 219,433 L 288,421 L 304,430 L 286,466 L 253,507 L 214,538 L 176,557",
        "length": 307
      },
      {
        "name": "七笔",
        "path": "M 511,343 L 521,367 L 453,418 L 448,415",
        "length": 117
      },
      {
        "name": "八笔",
        "path": "M 408,409 L 431,419 L 483,474 L 536,514 L 563,526 L 624,529",
        "length": 258
      },
      {
        "name": "九笔",
        "path": "M 273,561 L 296,567 L 412,550 L 437,549 L 460,554",
        "length": 190
      },
      {
        "name": "十笔",
        "path": "M 219,593 L 207,630 L 178,685",
        "length": 101
      },
      {
        "name": "十一笔",
        "path": "M 298,608 L 318,642 L 323,659",
        "length": 57
      },
      {
        "name": "十二笔",
        "path": "M 386,599 L 417,634 L 427,656",
        "length": 71
      },
      {
        "name": "十三笔",
        "path": "M 472,583 L 539,638 L 552,657 L 558,678",
        "length": 132
      }
    ]
  },
  "fry_guo": {
    "id": "fry_guo",
    "character": "煎",
    "pinyin": "jiān",
    "teochewIPA": "tsin¹",
    "teochewAudio": "/audio/tsiang1.mp3",
    "triggerName": "热鼎慢煎",
    "imageUrl": "/images/items/fry_guo.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 299,199 L 342,227 L 354,249",
        "length": 76
      },
      {
        "name": "二笔",
        "path": "M 454,165 L 462,169 L 473,184 L 427,263 L 414,266",
        "length": 132
      },
      {
        "name": "三笔",
        "path": "M 183,307 L 215,312 L 352,291 L 568,270 L 617,283",
        "length": 439
      },
      {
        "name": "四笔",
        "path": "M 260,351 L 273,365 L 275,402 L 270,472 L 259,554",
        "length": 209
      },
      {
        "name": "五笔",
        "path": "M 292,357 L 300,359 L 341,347 L 359,346 L 378,361 L 375,400 L 378,506 L 373,536 L 362,550 L 356,549 L 313,529",
        "length": 340
      },
      {
        "name": "六笔",
        "path": "M 291,422 L 297,415 L 305,413 L 325,410 L 338,413",
        "length": 51
      },
      {
        "name": "七笔",
        "path": "M 288,481 L 293,474 L 313,470 L 341,472",
        "length": 57
      },
      {
        "name": "八笔",
        "path": "M 435,363 L 448,376 L 450,384 L 449,499",
        "length": 142
      },
      {
        "name": "九笔",
        "path": "M 504,324 L 530,350 L 529,516 L 518,542 L 504,538 L 463,515",
        "length": 293
      },
      {
        "name": "十笔",
        "path": "M 238,595 L 220,641 L 193,685",
        "length": 101
      },
      {
        "name": "十一笔",
        "path": "M 318,598 L 348,641 L 354,660",
        "length": 72
      },
      {
        "name": "十二笔",
        "path": "M 427,591 L 460,632 L 468,653",
        "length": 75
      },
      {
        "name": "十三笔",
        "path": "M 537,597 L 592,641 L 603,658 L 609,679",
        "length": 113
      }
    ]
  },
  "sweet_taste": {
    "id": "sweet_taste",
    "character": "甜",
    "pinyin": "tián",
    "teochewIPA": "tiⁿ¹",
    "teochewAudio": "/audio/tiem5.mp3",
    "triggerName": "香甜可口",
    "imageUrl": "/images/items/sweet_taste.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 325,176 L 288,180 L 271,202 L 228,237 L 177,269 L 133,289",
        "length": 229
      },
      {
        "name": "二笔",
        "path": "M 90,389 L 117,394 L 133,392 L 290,351 L 318,347 L 337,349",
        "length": 253
      },
      {
        "name": "三笔",
        "path": "M 230,261 L 250,267 L 255,273 L 255,283 L 240,453 L 235,467 L 228,473",
        "length": 233
      },
      {
        "name": "四笔",
        "path": "M 148,484 L 168,501 L 171,510 L 197,639",
        "length": 167
      },
      {
        "name": "五笔",
        "path": "M 190,499 L 196,493 L 255,483 L 281,474 L 301,473 L 308,477 L 321,491 L 320,500 L 305,557 L 289,567",
        "length": 230
      },
      {
        "name": "六笔",
        "path": "M 211,612 L 220,601 L 282,588 L 313,587 L 328,591",
        "length": 124
      },
      {
        "name": "七笔",
        "path": "M 351,368 L 376,373 L 398,370 L 484,351 L 639,328 L 672,328 L 710,336",
        "length": 364
      },
      {
        "name": "八笔",
        "path": "M 397,230 L 427,261 L 420,648",
        "length": 430
      },
      {
        "name": "九笔",
        "path": "M 544,165 L 556,171 L 579,192 L 574,318 L 580,582 L 578,602 L 567,628 L 565,685",
        "length": 540
      },
      {
        "name": "十笔",
        "path": "M 446,482 L 451,473 L 485,465 L 514,463 L 529,468",
        "length": 90
      },
      {
        "name": "十一笔",
        "path": "M 441,624 L 453,614 L 466,610 L 529,605",
        "length": 92
      }
    ]
  },
  "peach_shape": {
    "id": "peach_shape",
    "character": "桃",
    "pinyin": "táo",
    "teochewIPA": "thô⁵",
    "teochewAudio": "/audio/tho5.mp3",
    "triggerName": "寿桃图案",
    "imageUrl": "/images/items/peach_shape.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 165,354 L 207,353 L 301,324 L 338,322",
        "length": 177
      },
      {
        "name": "二笔",
        "path": "M 253,165 L 284,198 L 271,556 L 261,631 L 261,685",
        "length": 533
      },
      {
        "name": "三笔",
        "path": "M 262,357 L 248,411 L 230,447 L 178,527 L 127,586",
        "length": 269
      },
      {
        "name": "四笔",
        "path": "M 292,400 L 300,410 L 327,426 L 338,446",
        "length": 67
      },
      {
        "name": "五笔",
        "path": "M 417,251 L 444,273 L 442,416 L 430,508 L 418,543 L 391,587 L 362,614 L 324,634",
        "length": 442
      },
      {
        "name": "六笔",
        "path": "M 352,352 L 386,370 L 397,387",
        "length": 59
      },
      {
        "name": "七笔",
        "path": "M 326,495 L 347,495 L 357,491 L 415,450 L 420,446 L 421,437",
        "length": 118
      },
      {
        "name": "八笔",
        "path": "M 496,196 L 514,206 L 526,225 L 517,310 L 512,430 L 515,544 L 525,583 L 540,600 L 564,610 L 602,613 L 640,607 L 660,593 L 673,516",
        "length": 631
      },
      {
        "name": "九笔",
        "path": "M 589,291 L 598,312 L 583,329 L 537,366 L 530,375",
        "length": 116
      },
      {
        "name": "十笔",
        "path": "M 528,440 L 604,481 L 624,508",
        "length": 120
      }
    ]
  },
  "year_festival": {
    "id": "year_festival",
    "character": "年",
    "pinyin": "nián",
    "teochewIPA": "nî⁵",
    "teochewAudio": "/audio/ni~5.mp3",
    "triggerName": "过年过节",
    "imageUrl": "/images/items/year_festival.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 326,165 L 341,188 L 316,240 L 283,284 L 265,301 L 236,322",
        "length": 201
      },
      {
        "name": "二笔",
        "path": "M 332,251 L 381,252 L 503,227 L 529,228",
        "length": 200
      },
      {
        "name": "三笔",
        "path": "M 309,354 L 328,363 L 490,336 L 528,341",
        "length": 224
      },
      {
        "name": "四笔",
        "path": "M 276,350 L 294,364 L 300,377 L 307,440 L 310,447 L 318,455",
        "length": 119
      },
      {
        "name": "五笔",
        "path": "M 161,477 L 176,483 L 204,487 L 369,464 L 574,446 L 607,450 L 639,463",
        "length": 485
      },
      {
        "name": "六笔",
        "path": "M 391,265 L 417,280 L 421,286 L 414,685",
        "length": 436
      }
    ]
  }
}
};
