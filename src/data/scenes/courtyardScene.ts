import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：大厅天井 (开门迎客)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const courtyardSceneConfig: SceneConfig = {
  id: 'courtyard',
  name: '大厅天井',
  subtitle: '开门迎客',
  icon: '🚪',
  hintText: '👆 点院落物事识字',
  backText: '大厅',
  liquidType: 'water',
  defaultWordId: 'door',
  words: {
  "door": {
    "id": "door",
    "character": "门",
    "pinyin": "mén",
    "teochewIPA": "mŋ̂⁵",
    "teochewAudio": "/audio/mung5.mp3",
    "triggerName": "宅门",
    "imageUrl": "/images/items/door.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 266,165 L 315,212 L 329,236",
        "length": 96
      },
      {
        "name": "二笔",
        "path": "M 183,218 L 206,240 L 214,252 L 214,263 L 206,511 L 186,643 L 186,677",
        "length": 473
      },
      {
        "name": "三笔",
        "path": "M 414,185 L 435,192 L 454,192 L 535,174 L 573,171 L 594,177 L 611,193 L 613,200 L 617,648 L 602,685 L 563,675 L 516,653",
        "length": 795
      }
    ]
  },
  "lock": {
    "id": "lock",
    "character": "锁",
    "pinyin": "suǒ",
    "teochewIPA": "só²",
    "teochewAudio": "/audio/so2.mp3",
    "triggerName": "铜锁",
    "imageUrl": "/images/items/lock.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 312,174 L 326,187 L 334,202 L 306,258 L 279,305 L 235,367 L 186,425 L 153,455",
        "length": 349
      },
      {
        "name": "二笔",
        "path": "M 298,303 L 316,293 L 373,277 L 400,274",
        "length": 107
      },
      {
        "name": "三笔",
        "path": "M 256,388 L 284,388 L 358,366 L 386,364",
        "length": 133
      },
      {
        "name": "四笔",
        "path": "M 224,489 L 262,489 L 347,460 L 380,457",
        "length": 161
      },
      {
        "name": "五笔",
        "path": "M 286,403 L 304,412 L 307,418 L 309,507 L 301,579 L 304,593 L 326,588 L 390,542",
        "length": 304
      },
      {
        "name": "六笔",
        "path": "M 513,165 L 532,179 L 538,190 L 533,298 L 532,308 L 522,321",
        "length": 171
      },
      {
        "name": "七笔",
        "path": "M 438,241 L 460,262 L 472,282",
        "length": 54
      },
      {
        "name": "八笔",
        "path": "M 630,189 L 641,209 L 582,273",
        "length": 110
      },
      {
        "name": "九笔",
        "path": "M 434,329 L 450,344 L 455,371 L 457,428 L 447,529 L 449,555",
        "length": 234
      },
      {
        "name": "十笔",
        "path": "M 465,337 L 479,341 L 510,336 L 589,316 L 601,318 L 620,337 L 617,419 L 620,501 L 616,547",
        "length": 377
      },
      {
        "name": "十一笔",
        "path": "M 505,402 L 516,406 L 534,426 L 529,515 L 512,588 L 496,619 L 461,652 L 415,676 L 385,683",
        "length": 368
      },
      {
        "name": "十二笔",
        "path": "M 566,586 L 624,637 L 638,657 L 647,685",
        "length": 131
      }
    ]
  },
  "table": {
    "id": "table",
    "character": "桌",
    "pinyin": "zhuō",
    "teochewIPA": "toh⁴",
    "teochewAudio": "/audio/toh4.mp3",
    "triggerName": "八仙桌",
    "imageUrl": "/images/items/table.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 355,165 L 378,185 L 377,264 L 375,272 L 367,278",
        "length": 128
      },
      {
        "name": "二笔",
        "path": "M 397,220 L 492,203 L 517,204",
        "length": 122
      },
      {
        "name": "三笔",
        "path": "M 254,298 L 270,311 L 275,324 L 302,434",
        "length": 148
      },
      {
        "name": "四笔",
        "path": "M 286,300 L 296,306 L 445,281 L 467,282 L 479,287 L 492,305 L 476,340 L 452,414",
        "length": 336
      },
      {
        "name": "五笔",
        "path": "M 304,365 L 308,361 L 395,345 L 417,348",
        "length": 116
      },
      {
        "name": "六笔",
        "path": "M 312,421 L 331,413 L 413,401 L 431,401 L 436,406",
        "length": 129
      },
      {
        "name": "七笔",
        "path": "M 174,508 L 206,513 L 342,495 L 532,478 L 561,481 L 583,489",
        "length": 413
      },
      {
        "name": "八笔",
        "path": "M 360,429 L 367,434 L 376,452 L 376,586 L 372,639 L 379,685",
        "length": 262
      },
      {
        "name": "九笔",
        "path": "M 358,506 L 314,561 L 274,596 L 222,629 L 169,652",
        "length": 243
      },
      {
        "name": "十笔",
        "path": "M 392,504 L 400,519 L 452,567 L 521,619 L 558,629 L 631,637",
        "length": 286
      }
    ]
  },
  "chair": {
    "id": "chair",
    "character": "椅",
    "pinyin": "yǐ",
    "teochewIPA": "í²",
    "teochewAudio": "/audio/i~2.mp3",
    "triggerName": "靠背椅",
    "imageUrl": "/images/items/chair.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 153,350 L 167,353 L 198,351 L 300,322 L 337,320",
        "length": 188
      },
      {
        "name": "二笔",
        "path": "M 242,176 L 273,208 L 265,513 L 255,613 L 256,667",
        "length": 504
      },
      {
        "name": "三笔",
        "path": "M 252,356 L 239,408 L 225,435 L 171,517 L 124,570",
        "length": 253
      },
      {
        "name": "四笔",
        "path": "M 282,388 L 289,390 L 292,399 L 312,413 L 323,432",
        "length": 63
      },
      {
        "name": "五笔",
        "path": "M 379,255 L 426,259 L 486,248 L 546,232 L 579,233",
        "length": 203
      },
      {
        "name": "六笔",
        "path": "M 449,165 L 462,173 L 472,187 L 465,254 L 458,280 L 434,325 L 396,360 L 376,372",
        "length": 253
      },
      {
        "name": "七笔",
        "path": "M 473,292 L 490,296 L 531,319 L 544,332 L 552,347",
        "length": 100
      },
      {
        "name": "八笔",
        "path": "M 349,404 L 366,408 L 389,407 L 462,392 L 629,372 L 676,382",
        "length": 331
      },
      {
        "name": "九笔",
        "path": "M 349,463 L 367,484 L 380,565",
        "length": 110
      },
      {
        "name": "十笔",
        "path": "M 380,465 L 386,469 L 436,456 L 455,457 L 466,468 L 456,507 L 453,514 L 443,520",
        "length": 153
      },
      {
        "name": "十一笔",
        "path": "M 393,552 L 402,543 L 437,537 L 470,541",
        "length": 81
      },
      {
        "name": "十二笔",
        "path": "M 524,400 L 546,413 L 550,423 L 548,660 L 534,685 L 506,676 L 466,653",
        "length": 378
      }
    ]
  },
  "broom": {
    "id": "broom",
    "character": "扫",
    "pinyin": "sǎo",
    "teochewIPA": "sàu³",
    "teochewAudio": "/audio/sau3.mp3",
    "triggerName": "竹扫帚",
    "imageUrl": "/images/items/broom.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 186,338 L 200,342 L 233,340 L 347,310 L 395,306",
        "length": 214
      },
      {
        "name": "二笔",
        "path": "M 293,165 L 321,187 L 325,197 L 315,431 L 316,642 L 312,663 L 300,685 L 278,679 L 212,646",
        "length": 635
      },
      {
        "name": "三笔",
        "path": "M 130,565 L 167,567 L 233,519 L 379,422",
        "length": 294
      },
      {
        "name": "四笔",
        "path": "M 433,363 L 461,367 L 475,365 L 627,332 L 650,340 L 667,359 L 632,564 L 612,584",
        "length": 484
      },
      {
        "name": "五笔",
        "path": "M 402,494 L 432,499 L 562,476 L 596,479",
        "length": 197
      },
      {
        "name": "六笔",
        "path": "M 414,627 L 436,631 L 622,607 L 648,607 L 670,615",
        "length": 259
      }
    ]
  },
  "clean": {
    "id": "clean",
    "character": "净",
    "pinyin": "jìng",
    "teochewIPA": "tsiã⁶",
    "teochewAudio": "/audio/tseng6.mp3",
    "triggerName": "青石净地",
    "imageUrl": "/images/items/clean.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 158,259 L 167,267 L 211,295 L 228,322",
        "length": 96
      },
      {
        "name": "二笔",
        "path": "M 157,617 L 148,586 L 178,537 L 240,418",
        "length": 224
      },
      {
        "name": "三笔",
        "path": "M 391,165 L 404,179 L 409,192 L 401,208 L 356,278 L 319,323 L 295,343",
        "length": 224
      },
      {
        "name": "四笔",
        "path": "M 384,267 L 401,259 L 462,246 L 484,252 L 486,257 L 474,280 L 421,347 L 409,357",
        "length": 236
      },
      {
        "name": "五笔",
        "path": "M 312,382 L 333,385 L 382,378 L 514,346 L 532,351 L 551,369 L 549,380 L 523,467 L 505,481",
        "length": 376
      },
      {
        "name": "六笔",
        "path": "M 255,458 L 287,462 L 448,434 L 593,415 L 615,414 L 652,423",
        "length": 402
      },
      {
        "name": "七笔",
        "path": "M 310,528 L 323,532 L 505,500 L 533,500 L 549,506",
        "length": 243
      },
      {
        "name": "八笔",
        "path": "M 393,387 L 413,399 L 421,450 L 429,581 L 424,640 L 415,666 L 398,685 L 321,651",
        "length": 403
      }
    ]
  },
  "open": {
    "id": "open",
    "character": "开",
    "pinyin": "kāi",
    "teochewIPA": "khui¹",
    "teochewAudio": "/audio/khui1.mp3",
    "triggerName": "推门迎客",
    "imageUrl": "/images/items/open.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 266,197 L 281,202 L 317,202 L 483,170 L 524,165 L 541,167",
        "length": 279
      },
      {
        "name": "二笔",
        "path": "M 118,401 L 136,410 L 164,414 L 354,385 L 619,359 L 657,368 L 682,379",
        "length": 573
      },
      {
        "name": "三笔",
        "path": "M 282,261 L 294,268 L 311,288 L 309,389 L 294,483 L 277,528 L 243,583 L 207,616 L 181,633",
        "length": 429
      },
      {
        "name": "四笔",
        "path": "M 438,202 L 465,217 L 476,231 L 476,685",
        "length": 503
      }
    ]
  },
  "close": {
    "id": "close",
    "character": "关",
    "pinyin": "guān",
    "teochewIPA": "kuĩ¹",
    "teochewAudio": "/audio/kueng1.mp3",
    "triggerName": "闭门防风",
    "imageUrl": "/images/items/close.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 270,206 L 321,240 L 338,266",
        "length": 92
      },
      {
        "name": "二笔",
        "path": "M 489,165 L 502,179 L 507,193 L 478,223 L 435,261 L 417,271 L 414,278",
        "length": 161
      },
      {
        "name": "三笔",
        "path": "M 247,346 L 276,352 L 317,351 L 504,318 L 539,318",
        "length": 296
      },
      {
        "name": "四笔",
        "path": "M 151,495 L 188,502 L 405,474 L 580,461 L 641,474",
        "length": 494
      },
      {
        "name": "五笔",
        "path": "M 351,365 L 378,383 L 382,390 L 382,406 L 374,473 L 359,523 L 342,559 L 313,603 L 285,629 L 235,657 L 184,676",
        "length": 419
      },
      {
        "name": "六笔",
        "path": "M 393,494 L 468,591 L 531,653 L 551,663 L 649,685",
        "length": 334
      }
    ]
  },
  "enter": {
    "id": "enter",
    "character": "进",
    "pinyin": "jìn",
    "teochewIPA": "tsìn³",
    "teochewAudio": "/audio/tsing3.mp3",
    "triggerName": "请客进门",
    "imageUrl": "/images/items/enter.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 341,326 L 394,330 L 548,297 L 587,297",
        "length": 250
      },
      {
        "name": "二笔",
        "path": "M 315,442 L 349,446 L 462,425 L 588,410 L 629,415 L 645,424",
        "length": 336
      },
      {
        "name": "三笔",
        "path": "M 388,236 L 402,243 L 414,260 L 417,345 L 408,431 L 395,468 L 370,510 L 347,536 L 324,552",
        "length": 359
      },
      {
        "name": "四笔",
        "path": "M 487,165 L 518,196 L 519,458 L 512,551 L 514,607",
        "length": 455
      },
      {
        "name": "五笔",
        "path": "M 214,181 L 270,220 L 285,247",
        "length": 99
      },
      {
        "name": "六笔",
        "path": "M 111,400 L 156,397 L 229,369 L 238,369 L 254,380 L 253,406 L 229,455 L 228,466 L 233,490 L 260,547 L 260,573 L 252,580",
        "length": 368
      },
      {
        "name": "七笔",
        "path": "M 115,616 L 145,625 L 207,600 L 261,598 L 311,612 L 453,663 L 513,678 L 574,685 L 614,682 L 689,662",
        "length": 596
      }
    ]
  },
  "sit": {
    "id": "sit",
    "character": "坐",
    "pinyin": "zuò",
    "teochewIPA": "tsē⁷",
    "teochewAudio": "/audio/tso6.mp3",
    "triggerName": "请坐喝茶",
    "imageUrl": "/images/items/sit.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 248,268 L 267,291 L 240,367 L 200,429 L 181,452 L 146,482",
        "length": 260
      },
      {
        "name": "二笔",
        "path": "M 241,398 L 259,399 L 297,417 L 315,433 L 324,448",
        "length": 102
      },
      {
        "name": "三笔",
        "path": "M 516,246 L 533,264 L 535,272 L 513,339 L 475,401 L 429,450",
        "length": 243
      },
      {
        "name": "四笔",
        "path": "M 503,388 L 514,387 L 576,415 L 592,430 L 602,449",
        "length": 122
      },
      {
        "name": "五笔",
        "path": "M 259,540 L 287,546 L 324,544 L 379,537 L 488,513 L 529,513",
        "length": 274
      },
      {
        "name": "六笔",
        "path": "M 359,165 L 397,195 L 399,209 L 390,613 L 388,636 L 375,649",
        "length": 508
      },
      {
        "name": "七笔",
        "path": "M 164,677 L 189,685 L 214,685 L 357,667 L 576,653 L 613,656 L 654,670",
        "length": 495
      }
    ]
  },
  "lamp": {
    "id": "lamp",
    "character": "灯",
    "pinyin": "dēng",
    "teochewIPA": "teng¹",
    "teochewAudio": "/audio/teng1.mp3",
    "triggerName": "明亮厅灯",
    "imageUrl": "/images/items/lamp.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 148,314 L 149,374 L 139,436",
        "length": 123
      },
      {
        "name": "二笔",
        "path": "M 342,247 L 352,273 L 281,328 L 274,329 L 272,341",
        "length": 137
      },
      {
        "name": "三笔",
        "path": "M 212,165 L 233,178 L 250,196 L 249,349 L 236,491 L 213,566 L 187,610 L 149,648 L 103,673",
        "length": 581
      },
      {
        "name": "四笔",
        "path": "M 258,483 L 317,531 L 335,562",
        "length": 112
      },
      {
        "name": "五笔",
        "path": "M 372,324 L 408,329 L 491,310 L 638,288 L 697,299",
        "length": 330
      },
      {
        "name": "六笔",
        "path": "M 512,327 L 534,341 L 545,361 L 550,630 L 545,661 L 531,685 L 496,676 L 437,648",
        "length": 479
      }
    ]
  },
  "clock": {
    "id": "clock",
    "character": "钟",
    "pinyin": "zhōng",
    "teochewIPA": "tseng¹",
    "teochewAudio": "/audio/tseng1.mp3",
    "triggerName": "老式挂钟",
    "imageUrl": "/images/items/clock.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 297,165 L 313,180 L 320,194 L 298,238 L 250,316 L 224,351 L 175,410 L 142,439",
        "length": 343
      },
      {
        "name": "二笔",
        "path": "M 286,293 L 372,264 L 394,263",
        "length": 113
      },
      {
        "name": "三笔",
        "path": "M 236,376 L 267,377 L 349,349 L 374,347",
        "length": 143
      },
      {
        "name": "四笔",
        "path": "M 209,475 L 239,476 L 291,463 L 358,441 L 386,438",
        "length": 182
      },
      {
        "name": "五笔",
        "path": "M 276,389 L 290,397 L 302,415 L 304,499 L 295,569 L 298,587 L 329,579 L 386,542",
        "length": 311
      },
      {
        "name": "六笔",
        "path": "M 400,321 L 418,336 L 425,353 L 448,470",
        "length": 161
      },
      {
        "name": "七笔",
        "path": "M 437,325 L 448,331 L 505,319 L 637,302 L 658,325 L 634,400 L 618,406",
        "length": 331
      },
      {
        "name": "八笔",
        "path": "M 460,441 L 473,448 L 612,428 L 639,429 L 655,434",
        "length": 199
      },
      {
        "name": "九笔",
        "path": "M 501,177 L 516,181 L 538,202 L 533,302 L 532,685",
        "length": 529
      }
    ]
  },
  "hall": {
    "id": "hall",
    "character": "堂",
    "pinyin": "táng",
    "teochewIPA": "tông⁵",
    "teochewAudio": "/audio/thang5.mp3",
    "triggerName": "中堂大厅",
    "imageUrl": "/images/items/hall.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 379,165 L 405,189 L 402,295 L 400,308 L 392,316",
        "length": 166
      },
      {
        "name": "二笔",
        "path": "M 286,237 L 320,269 L 328,286",
        "length": 65
      },
      {
        "name": "三笔",
        "path": "M 514,191 L 527,213 L 460,276",
        "length": 118
      },
      {
        "name": "四笔",
        "path": "M 210,324 L 218,345 L 215,363 L 192,413 L 192,447",
        "length": 130
      },
      {
        "name": "五笔",
        "path": "M 237,362 L 246,354 L 348,336 L 539,309 L 574,310 L 596,323 L 603,335 L 565,384 L 558,387",
        "length": 453
      },
      {
        "name": "六笔",
        "path": "M 293,404 L 307,413 L 316,427 L 336,505",
        "length": 114
      },
      {
        "name": "七笔",
        "path": "M 325,402 L 331,407 L 341,408 L 438,387 L 469,387 L 483,399 L 486,408 L 471,448 L 456,453",
        "length": 235
      },
      {
        "name": "八笔",
        "path": "M 348,497 L 356,488 L 440,475 L 484,479",
        "length": 141
      },
      {
        "name": "九笔",
        "path": "M 296,577 L 342,583 L 467,563 L 498,566",
        "length": 204
      },
      {
        "name": "十笔",
        "path": "M 375,498 L 397,519 L 395,637 L 384,651",
        "length": 166
      },
      {
        "name": "十一笔",
        "path": "M 199,678 L 232,685 L 359,669 L 554,654 L 576,658 L 608,669",
        "length": 414
      }
    ]
  }
}
};
