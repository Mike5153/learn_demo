import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：祖厅神台 (拜老爷祈福)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const altarSceneConfig: SceneConfig = {
  id: 'altar',
  name: '祖厅神台',
  subtitle: '拜老爷祈福',
  icon: '🏮',
  hintText: '👆 点神台供礼识字',
  backText: '神台',
  liquidType: 'tea',
  defaultWordId: 'incense',
  words: {
  "incense": {
    "id": "incense",
    "character": "香",
    "pinyin": "xiāng",
    "teochewIPA": "hiang¹",
    "teochewAudio": "/audio/phang1.mp3",
    "triggerName": "红脚清香",
    "imageUrl": "/images/items/incense.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 480,175 L 470,170 L 437,165 L 365,201 L 252,237",
        "length": 244
      },
      {
        "name": "二笔",
        "path": "M 185,324 L 220,328 L 329,307 L 531,282 L 584,293",
        "length": 404
      },
      {
        "name": "三笔",
        "path": "M 363,219 L 389,237 L 383,397 L 387,435",
        "length": 230
      },
      {
        "name": "四笔",
        "path": "M 367,318 L 349,332 L 300,390 L 263,421 L 190,469 L 130,493",
        "length": 299
      },
      {
        "name": "五笔",
        "path": "M 404,315 L 502,393 L 552,425 L 595,434 L 670,440",
        "length": 304
      },
      {
        "name": "六笔",
        "path": "M 279,469 L 296,485 L 301,510 L 302,552 L 293,649 L 294,685",
        "length": 224
      },
      {
        "name": "七笔",
        "path": "M 315,476 L 324,483 L 335,482 L 454,456 L 471,467 L 480,478 L 482,656 L 474,670 L 435,659",
        "length": 413
      },
      {
        "name": "八笔",
        "path": "M 320,572 L 326,566 L 381,553 L 404,550 L 427,554",
        "length": 112
      },
      {
        "name": "九笔",
        "path": "M 312,663 L 328,653 L 415,641 L 436,642 L 450,649",
        "length": 143
      }
    ]
  },
  "candle": {
    "id": "candle",
    "character": "烛",
    "pinyin": "zhú",
    "teochewIPA": "tsiek⁴",
    "teochewAudio": "/audio/tsek4.mp3",
    "triggerName": "神前红烛",
    "imageUrl": "/images/items/candle.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 165,311 L 167,379 L 157,442",
        "length": 132
      },
      {
        "name": "二笔",
        "path": "M 339,256 L 351,278 L 279,352",
        "length": 128
      },
      {
        "name": "三笔",
        "path": "M 222,167 L 236,174 L 259,199 L 259,323 L 248,520 L 233,572 L 202,628 L 177,654 L 125,685",
        "length": 586
      },
      {
        "name": "四笔",
        "path": "M 272,500 L 284,513 L 320,537 L 337,562",
        "length": 91
      },
      {
        "name": "五笔",
        "path": "M 357,348 L 378,363 L 384,376 L 414,495",
        "length": 163
      },
      {
        "name": "六笔",
        "path": "M 398,349 L 411,356 L 513,339 L 580,321 L 596,321 L 611,325 L 632,345 L 609,413 L 592,423",
        "length": 340
      },
      {
        "name": "七笔",
        "path": "M 428,480 L 439,470 L 577,445 L 627,449",
        "length": 205
      },
      {
        "name": "八笔",
        "path": "M 468,165 L 505,194 L 507,214 L 501,583 L 488,597",
        "length": 455
      },
      {
        "name": "九笔",
        "path": "M 335,639 L 369,653 L 380,652 L 555,598 L 601,585 L 612,587",
        "length": 290
      },
      {
        "name": "十笔",
        "path": "M 588,520 L 638,582 L 666,627 L 674,646 L 675,677",
        "length": 184
      }
    ]
  },
  "worship": {
    "id": "worship",
    "character": "拜",
    "pinyin": "bài",
    "teochewIPA": "pài³",
    "teochewAudio": "/audio/pai3.mp3",
    "triggerName": "虔诚礼拜",
    "imageUrl": "/images/items/worship.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 366,167 L 332,165 L 298,190 L 265,208 L 217,227 L 193,232",
        "length": 190
      },
      {
        "name": "二笔",
        "path": "M 175,320 L 188,323 L 222,322 L 305,300 L 346,299",
        "length": 174
      },
      {
        "name": "三笔",
        "path": "M 124,422 L 164,429 L 319,395 L 342,393 L 359,396",
        "length": 240
      },
      {
        "name": "四笔",
        "path": "M 243,230 L 271,248 L 273,284 L 270,396 L 255,479 L 235,533 L 217,563 L 183,606 L 138,641",
        "length": 470
      },
      {
        "name": "五笔",
        "path": "M 417,189 L 431,192 L 455,192 L 495,185 L 557,167 L 588,168",
        "length": 175
      },
      {
        "name": "六笔",
        "path": "M 418,290 L 462,284 L 548,264 L 578,268",
        "length": 163
      },
      {
        "name": "七笔",
        "path": "M 408,371 L 427,371 L 544,345 L 576,350",
        "length": 171
      },
      {
        "name": "八笔",
        "path": "M 341,453 L 378,457 L 522,433 L 627,421 L 676,432",
        "length": 339
      },
      {
        "name": "九笔",
        "path": "M 457,210 L 487,227 L 489,250 L 485,685",
        "length": 493
      }
    ]
  },
  "fortune": {
    "id": "fortune",
    "character": "福",
    "pinyin": "fú",
    "teochewIPA": "hok⁴",
    "teochewAudio": "/audio/hok4.mp3",
    "triggerName": "金字红福",
    "imageUrl": "/images/items/fortune.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 277,165 L 339,197 L 358,223",
        "length": 102
      },
      {
        "name": "二笔",
        "path": "M 156,354 L 193,363 L 248,349 L 302,329 L 331,332 L 313,374 L 260,450 L 218,497 L 181,532 L 128,570",
        "length": 499
      },
      {
        "name": "三笔",
        "path": "M 277,454 L 289,492 L 287,566 L 279,645 L 283,685",
        "length": 233
      },
      {
        "name": "四笔",
        "path": "M 320,437 L 347,464 L 353,476",
        "length": 52
      },
      {
        "name": "五笔",
        "path": "M 446,214 L 461,218 L 493,217 L 588,192 L 620,192",
        "length": 178
      },
      {
        "name": "六笔",
        "path": "M 427,293 L 446,309 L 469,405",
        "length": 124
      },
      {
        "name": "七笔",
        "path": "M 464,295 L 472,301 L 572,278 L 591,282 L 606,299 L 591,340 L 574,352",
        "length": 219
      },
      {
        "name": "八笔",
        "path": "M 480,391 L 487,385 L 569,369 L 598,367 L 613,372",
        "length": 138
      },
      {
        "name": "九笔",
        "path": "M 383,448 L 401,462 L 414,484 L 430,618 L 440,652",
        "length": 219
      },
      {
        "name": "十笔",
        "path": "M 418,451 L 424,457 L 440,462 L 634,426 L 648,428 L 662,437 L 672,448 L 671,455 L 655,585 L 649,614 L 636,638 L 637,675",
        "length": 500
      },
      {
        "name": "十一笔",
        "path": "M 462,549 L 567,527 L 598,530",
        "length": 138
      },
      {
        "name": "十二笔",
        "path": "M 513,465 L 532,480 L 532,586 L 521,602",
        "length": 150
      },
      {
        "name": "十三笔",
        "path": "M 453,634 L 460,627 L 473,624 L 603,608",
        "length": 154
      }
    ]
  },
  "peaceful": {
    "id": "peaceful",
    "character": "平",
    "pinyin": "píng",
    "teochewIPA": "pên⁵",
    "teochewAudio": "/audio/pheng5.mp3",
    "triggerName": "四时平顺",
    "imageUrl": "/images/items/peaceful.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 284,194 L 322,199 L 410,183 L 466,167 L 486,165 L 503,169",
        "length": 224
      },
      {
        "name": "二笔",
        "path": "M 243,269 L 290,314 L 300,339",
        "length": 92
      },
      {
        "name": "三笔",
        "path": "M 500,231 L 512,242 L 518,254 L 443,335",
        "length": 140
      },
      {
        "name": "四笔",
        "path": "M 153,427 L 186,433 L 324,410 L 581,385 L 608,386 L 647,398",
        "length": 499
      },
      {
        "name": "五笔",
        "path": "M 362,215 L 387,226 L 390,231 L 391,247 L 385,685",
        "length": 487
      }
    ]
  },
  "tranquil": {
    "id": "tranquil",
    "character": "宁",
    "pinyin": "níng",
    "teochewIPA": "nêng⁵",
    "teochewAudio": "/audio/leng5.mp3",
    "triggerName": "合家安宁",
    "imageUrl": "/images/items/tranquil.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 362,165 L 418,194 L 439,219",
        "length": 96
      },
      {
        "name": "二笔",
        "path": "M 228,270 L 234,291 L 224,317 L 198,363 L 191,396",
        "length": 136
      },
      {
        "name": "三笔",
        "path": "M 249,310 L 266,302 L 477,266 L 552,257 L 590,262 L 604,274 L 609,286 L 552,340",
        "length": 457
      },
      {
        "name": "四笔",
        "path": "M 238,440 L 274,443 L 402,422 L 528,408 L 575,420",
        "length": 341
      },
      {
        "name": "五笔",
        "path": "M 385,443 L 408,453 L 415,465 L 415,645 L 411,665 L 402,685 L 396,684 L 322,652",
        "length": 348
      }
    ]
  },
  "god": {
    "id": "god",
    "character": "神",
    "pinyin": "shén",
    "teochewIPA": "sîn⁵",
    "teochewAudio": "/audio/sing5.mp3",
    "triggerName": "老爷神位",
    "imageUrl": "/images/items/god.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 280,165 L 337,194 L 355,217",
        "length": 93
      },
      {
        "name": "二笔",
        "path": "M 171,344 L 201,352 L 241,341 L 302,316 L 332,319 L 316,359 L 262,445 L 204,511 L 144,561",
        "length": 479
      },
      {
        "name": "三笔",
        "path": "M 289,434 L 293,454 L 299,464 L 299,530 L 292,622 L 296,653",
        "length": 222
      },
      {
        "name": "四笔",
        "path": "M 334,417 L 377,445 L 388,468",
        "length": 77
      },
      {
        "name": "五笔",
        "path": "M 393,321 L 410,334 L 422,351 L 442,461 L 455,497",
        "length": 192
      },
      {
        "name": "六笔",
        "path": "M 420,322 L 442,329 L 605,301 L 639,308 L 656,326 L 636,412 L 622,456 L 623,474",
        "length": 400
      },
      {
        "name": "七笔",
        "path": "M 468,400 L 563,386 L 582,384 L 596,388",
        "length": 130
      },
      {
        "name": "八笔",
        "path": "M 465,476 L 475,470 L 588,454 L 598,449",
        "length": 137
      },
      {
        "name": "九笔",
        "path": "M 499,171 L 515,174 L 536,195 L 531,289 L 530,685",
        "length": 536
      }
    ]
  },
  "flower": {
    "id": "flower",
    "character": "花",
    "pinyin": "huā",
    "teochewIPA": "hue¹",
    "teochewAudio": "/audio/hua1.mp3",
    "triggerName": "清香供花",
    "imageUrl": "/images/items/flower.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 194,285 L 227,291 L 393,266 L 556,251 L 595,255 L 619,264",
        "length": 430
      },
      {
        "name": "二笔",
        "path": "M 297,202 L 323,220 L 345,337",
        "length": 151
      },
      {
        "name": "三笔",
        "path": "M 466,165 L 476,171 L 489,191 L 466,274 L 439,346",
        "length": 199
      },
      {
        "name": "四笔",
        "path": "M 311,366 L 320,376 L 329,398 L 302,436 L 229,520 L 187,557 L 152,581",
        "length": 294
      },
      {
        "name": "五笔",
        "path": "M 291,478 L 293,496 L 300,509 L 298,584 L 290,647 L 293,685",
        "length": 210
      },
      {
        "name": "六笔",
        "path": "M 568,391 L 578,418 L 567,429 L 347,589",
        "length": 316
      },
      {
        "name": "七笔",
        "path": "M 420,372 L 435,388 L 440,402 L 433,529 L 436,596 L 448,633 L 466,651 L 494,662 L 537,669 L 590,664 L 623,651 L 644,634 L 648,543",
        "length": 576
      }
    ]
  },
  "fruit": {
    "id": "fruit",
    "character": "果",
    "pinyin": "guǒ",
    "teochewIPA": "kué²",
    "teochewAudio": "/audio/kue2.mp3",
    "triggerName": "大桔五果",
    "imageUrl": "/images/items/fruit.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 217,184 L 245,216 L 278,360",
        "length": 190
      },
      {
        "name": "二笔",
        "path": "M 237,180 L 266,191 L 446,165 L 472,166 L 488,171 L 504,194 L 467,318 L 462,328 L 445,330",
        "length": 441
      },
      {
        "name": "三笔",
        "path": "M 291,268 L 400,247 L 426,250",
        "length": 137
      },
      {
        "name": "四笔",
        "path": "M 290,346 L 321,336 L 438,316",
        "length": 151
      },
      {
        "name": "五笔",
        "path": "M 152,431 L 177,437 L 195,436 L 282,422 L 533,397 L 567,401 L 590,409",
        "length": 443
      },
      {
        "name": "六笔",
        "path": "M 351,191 L 369,204 L 367,685",
        "length": 503
      },
      {
        "name": "七笔",
        "path": "M 348,429 L 297,501 L 241,557 L 201,586 L 136,620",
        "length": 290
      },
      {
        "name": "八笔",
        "path": "M 387,427 L 392,431 L 397,447 L 430,483 L 495,545 L 538,578 L 592,596 L 664,609",
        "length": 346
      }
    ]
  },
  "great": {
    "id": "great",
    "character": "大",
    "pinyin": "dà",
    "teochewIPA": "tuā⁷",
    "teochewAudio": "/audio/tua7.mp3",
    "triggerName": "大吉大利",
    "imageUrl": "/images/items/great.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 173,403 L 212,406 L 379,373 L 517,352 L 552,355 L 579,363",
        "length": 412
      },
      {
        "name": "二笔",
        "path": "M 312,165 L 331,172 L 357,199 L 348,362 L 334,446 L 319,496 L 292,557 L 275,580 L 239,618 L 168,667 L 124,685",
        "length": 640
      },
      {
        "name": "三笔",
        "path": "M 360,422 L 369,447 L 421,521 L 477,590 L 519,633 L 555,661 L 676,684",
        "length": 435
      }
    ]
  },
  "lucky": {
    "id": "lucky",
    "character": "吉",
    "pinyin": "jí",
    "teochewIPA": "kiet⁴",
    "teochewAudio": "/audio/kik4.mp3",
    "triggerName": "吉祥如意",
    "imageUrl": "/images/items/lucky.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 175,325 L 210,332 L 333,312 L 572,288 L 625,301",
        "length": 455
      },
      {
        "name": "二笔",
        "path": "M 362,165 L 395,191 L 390,396 L 379,411",
        "length": 266
      },
      {
        "name": "三笔",
        "path": "M 259,436 L 293,441 L 483,416 L 504,417 L 539,427",
        "length": 283
      },
      {
        "name": "四笔",
        "path": "M 251,516 L 273,535 L 302,685",
        "length": 182
      },
      {
        "name": "五笔",
        "path": "M 295,539 L 309,529 L 411,516 L 467,503 L 491,504 L 515,528 L 491,598 L 473,611",
        "length": 332
      },
      {
        "name": "六笔",
        "path": "M 313,638 L 324,646 L 465,630 L 501,630 L 516,637",
        "length": 208
      }
    ]
  },
  "protect": {
    "id": "protect",
    "character": "保",
    "pinyin": "bǎo",
    "teochewIPA": "pó²",
    "teochewAudio": "/audio/po2.mp3",
    "triggerName": "保号儿孙",
    "imageUrl": "/images/items/protect.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 260,165 L 271,175 L 283,201 L 259,246 L 179,362 L 146,400 L 114,427",
        "length": 328
      },
      {
        "name": "二笔",
        "path": "M 230,329 L 229,352 L 237,367 L 238,406 L 233,521 L 223,615 L 227,649",
        "length": 323
      },
      {
        "name": "三笔",
        "path": "M 338,195 L 352,206 L 361,222 L 386,331",
        "length": 148
      },
      {
        "name": "四笔",
        "path": "M 372,195 L 379,201 L 389,202 L 512,176 L 530,180 L 550,200 L 526,260 L 508,272",
        "length": 278
      },
      {
        "name": "五笔",
        "path": "M 397,297 L 403,303 L 412,303 L 498,288 L 542,294",
        "length": 149
      },
      {
        "name": "六笔",
        "path": "M 290,416 L 326,419 L 398,404 L 575,376 L 605,375 L 645,384",
        "length": 360
      },
      {
        "name": "七笔",
        "path": "M 433,312 L 445,322 L 452,339 L 453,685",
        "length": 380
      },
      {
        "name": "八笔",
        "path": "M 434,415 L 396,474 L 343,531 L 295,565 L 273,577",
        "length": 232
      },
      {
        "name": "九笔",
        "path": "M 471,410 L 478,428 L 518,475 L 587,542 L 686,565",
        "length": 279
      }
    ]
  },
  "longevity": {
    "id": "longevity",
    "character": "寿",
    "pinyin": "shòu",
    "teochewIPA": "siu⁷",
    "teochewAudio": "/audio/siu7.mp3",
    "triggerName": "长生富寿",
    "imageUrl": "/images/items/longevity.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 281,259 L 306,264 L 342,263 L 420,251 L 497,235 L 534,235",
        "length": 256
      },
      {
        "name": "二笔",
        "path": "M 275,339 L 303,344 L 472,316 L 504,319",
        "length": 232
      },
      {
        "name": "三笔",
        "path": "M 170,427 L 207,438 L 358,414 L 570,392 L 615,399 L 631,405 L 636,411",
        "length": 475
      },
      {
        "name": "四笔",
        "path": "M 391,165 L 410,195 L 409,203 L 370,334 L 333,428 L 290,502 L 250,555 L 197,611 L 164,637",
        "length": 552
      },
      {
        "name": "五笔",
        "path": "M 318,515 L 350,521 L 544,494 L 567,492 L 593,498",
        "length": 278
      },
      {
        "name": "六笔",
        "path": "M 466,431 L 495,461 L 492,665 L 481,685 L 464,682 L 407,657",
        "length": 348
      },
      {
        "name": "七笔",
        "path": "M 325,565 L 367,588 L 382,611",
        "length": 75
      }
    ]
  }
}
};
