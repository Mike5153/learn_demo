import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：厝内药箱 (看药防错)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const medicineSceneConfig: SceneConfig = {
  id: 'medicine',
  name: '厝内药箱',
  subtitle: '看药防错',
  icon: '💊',
  hintText: '👆 点药箱药物识字',
  backText: '药箱',
  liquidType: 'water',
  defaultWordId: 'med',
  words: {
  "med": {
    "id": "med",
    "character": "药",
    "pinyin": "yào",
    "teochewIPA": "iêh⁸",
    "teochewAudio": "/audio/ieh8.mp3",
    "triggerName": "家庭药箱",
    "imageUrl": "/images/items/med.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 198,280 L 204,283 L 247,284 L 370,265 L 559,244 L 589,247 L 612,256",
        "length": 419
      },
      {
        "name": "二笔",
        "path": "M 296,206 L 310,212 L 322,223 L 340,313",
        "length": 123
      },
      {
        "name": "三笔",
        "path": "M 459,165 L 468,170 L 480,190 L 455,269 L 438,312",
        "length": 163
      },
      {
        "name": "四笔",
        "path": "M 277,334 L 289,350 L 292,366 L 225,462 L 222,476 L 289,482 L 304,476",
        "length": 251
      },
      {
        "name": "五笔",
        "path": "M 346,408 L 354,420 L 354,435 L 268,541 L 262,549 L 259,567 L 281,570 L 357,547",
        "length": 296
      },
      {
        "name": "六笔",
        "path": "M 188,654 L 223,664 L 383,598",
        "length": 209
      },
      {
        "name": "七笔",
        "path": "M 459,327 L 471,339 L 476,351 L 460,384 L 418,446 L 387,476",
        "length": 185
      },
      {
        "name": "八笔",
        "path": "M 466,412 L 489,403 L 558,390 L 572,397 L 583,409 L 572,567 L 561,625 L 544,665 L 525,683 L 517,685 L 463,648 L 461,641 L 453,641",
        "length": 503
      },
      {
        "name": "九笔",
        "path": "M 418,495 L 456,522 L 471,547",
        "length": 76
      }
    ]
  },
  "day": {
    "id": "day",
    "character": "日",
    "pinyin": "rì",
    "teochewIPA": "zih⁸",
    "teochewAudio": "/audio/jik8.mp3",
    "triggerName": "每日服用",
    "imageUrl": "/images/items/day.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 238,180 L 267,210 L 272,232 L 275,311 L 268,510 L 252,608 L 252,659",
        "length": 493
      },
      {
        "name": "二笔",
        "path": "M 297,199 L 308,208 L 319,206 L 512,165 L 538,177 L 555,195 L 562,363 L 562,590 L 551,632 L 553,685",
        "length": 768
      },
      {
        "name": "三笔",
        "path": "M 295,391 L 304,398 L 327,398 L 433,377 L 470,377",
        "length": 179
      },
      {
        "name": "四笔",
        "path": "M 282,631 L 293,621 L 354,612 L 473,599 L 510,602",
        "length": 233
      }
    ]
  },
  "morning_med": {
    "id": "morning_med",
    "character": "早",
    "pinyin": "zǎo",
    "teochewIPA": "tsá²",
    "teochewAudio": "/audio/tsa2.mp3",
    "triggerName": "早饭之前",
    "imageUrl": "/images/items/morning_med.svg",
    "tier": "basic",
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
  },
  "night_med": {
    "id": "night_med",
    "character": "晚",
    "pinyin": "wǎn",
    "teochewIPA": "mŋ́²",
    "teochewAudio": "/audio/mong2.mp3",
    "triggerName": "晚睡之前",
    "imageUrl": "/images/items/night_med.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 138,264 L 155,283 L 160,320 L 159,452 L 150,564 L 153,600",
        "length": 343
      },
      {
        "name": "二笔",
        "path": "M 175,276 L 195,276 L 240,259 L 266,274 L 266,528 L 260,573 L 261,601",
        "length": 426
      },
      {
        "name": "三笔",
        "path": "M 176,426 L 188,415 L 211,409 L 231,411",
        "length": 60
      },
      {
        "name": "四笔",
        "path": "M 171,579 L 175,573 L 187,565 L 239,553",
        "length": 75
      },
      {
        "name": "五笔",
        "path": "M 419,165 L 433,187 L 420,216 L 382,267 L 322,323",
        "length": 204
      },
      {
        "name": "六笔",
        "path": "M 411,256 L 485,241 L 508,249 L 476,304 L 436,355",
        "length": 228
      },
      {
        "name": "七笔",
        "path": "M 307,367 L 323,382 L 327,394 L 346,501",
        "length": 143
      },
      {
        "name": "八笔",
        "path": "M 344,373 L 351,378 L 423,367 L 521,344 L 546,345 L 566,366 L 539,429 L 523,435",
        "length": 322
      },
      {
        "name": "九笔",
        "path": "M 359,488 L 369,479 L 521,456 L 544,457 L 560,463",
        "length": 207
      },
      {
        "name": "十笔",
        "path": "M 416,380 L 438,397 L 422,486 L 400,553 L 352,620 L 310,655 L 261,681",
        "length": 381
      },
      {
        "name": "十一笔",
        "path": "M 451,499 L 468,522 L 462,600 L 466,643 L 481,664 L 509,678 L 546,685 L 587,684 L 628,675 L 655,661 L 662,653 L 659,555",
        "length": 467
      }
    ]
  },
  "pill": {
    "id": "pill",
    "character": "丸",
    "pinyin": "wán",
    "teochewIPA": "uân⁵",
    "teochewAudio": "/audio/i~5.mp3",
    "triggerName": "铝箔药丸",
    "imageUrl": "/images/items/pill.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 328,165 L 343,173 L 360,195 L 341,359 L 314,452 L 275,527 L 239,575 L 177,632 L 103,676",
        "length": 622
      },
      {
        "name": "二笔",
        "path": "M 156,366 L 182,376 L 208,375 L 462,306 L 491,306 L 497,313 L 491,338 L 470,393 L 450,472 L 440,539 L 440,574 L 445,611 L 457,639 L 476,660 L 498,672 L 547,684 L 594,685 L 652,674 L 673,662 L 681,651 L 697,547",
        "length": 1045
      },
      {
        "name": "三笔",
        "path": "M 227,466 L 325,532 L 344,552 L 353,576",
        "length": 171
      }
    ]
  },
  "take_dose": {
    "id": "take_dose",
    "character": "服",
    "pinyin": "fú",
    "teochewIPA": "hok⁸",
    "teochewAudio": "/audio/hok8.mp3",
    "triggerName": "温水送服",
    "imageUrl": "/images/items/take_dose.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 156,189 L 179,210 L 182,222 L 180,351 L 171,432 L 164,471 L 142,537 L 118,592 L 70,667",
        "length": 512
      },
      {
        "name": "二笔",
        "path": "M 202,195 L 214,202 L 274,182 L 289,187 L 304,204 L 301,525 L 296,613 L 283,636 L 263,630 L 212,602",
        "length": 630
      },
      {
        "name": "三笔",
        "path": "M 203,340 L 217,327 L 248,329",
        "length": 50
      },
      {
        "name": "四笔",
        "path": "M 189,453 L 194,445 L 210,439 L 234,436 L 249,440",
        "length": 66
      },
      {
        "name": "五笔",
        "path": "M 419,185 L 428,193 L 542,165 L 554,166 L 567,180 L 555,258 L 545,282 L 527,308 L 511,316 L 453,288",
        "length": 379
      },
      {
        "name": "六笔",
        "path": "M 370,173 L 392,198 L 400,268 L 396,488 L 380,635 L 384,685",
        "length": 522
      },
      {
        "name": "七笔",
        "path": "M 415,408 L 428,412 L 456,410 L 530,389 L 546,389 L 572,399 L 550,485 L 524,539 L 499,573 L 476,595 L 410,632",
        "length": 461
      },
      {
        "name": "八笔",
        "path": "M 415,450 L 451,483 L 535,575 L 588,616 L 608,627 L 638,634 L 730,646",
        "length": 387
      }
    ]
  },
  "eat_med": {
    "id": "eat_med",
    "character": "吃",
    "pinyin": "chī",
    "teochewIPA": "tsiah⁸",
    "teochewAudio": "/audio/khurh4.mp3",
    "triggerName": "遵医服药",
    "imageUrl": "/images/items/eat_med.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 133,346 L 150,361 L 154,369 L 180,521",
        "length": 186
      },
      {
        "name": "二笔",
        "path": "M 171,359 L 177,353 L 196,346 L 252,329 L 276,347 L 258,428 L 243,440",
        "length": 219
      },
      {
        "name": "三笔",
        "path": "M 191,479 L 197,470 L 243,456 L 280,457",
        "length": 96
      },
      {
        "name": "四笔",
        "path": "M 421,165 L 443,191 L 420,257 L 410,281 L 378,328 L 324,383",
        "length": 264
      },
      {
        "name": "五笔",
        "path": "M 397,328 L 475,320 L 557,296 L 582,295 L 592,299",
        "length": 200
      },
      {
        "name": "六笔",
        "path": "M 354,454 L 391,449 L 444,428 L 465,429 L 476,437 L 462,464 L 398,552 L 380,604 L 379,626 L 389,649 L 408,666 L 430,675 L 486,685 L 550,684 L 597,674 L 636,659 L 653,647 L 667,545",
        "length": 754
      }
    ]
  },
  "times_dose": {
    "id": "times_dose",
    "character": "次",
    "pinyin": "cì",
    "teochewIPA": "tshù³",
    "teochewAudio": "/audio/tshur3.mp3",
    "triggerName": "一日三次",
    "imageUrl": "/images/items/times_dose.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 173,280 L 232,324 L 248,355",
        "length": 108
      },
      {
        "name": "二笔",
        "path": "M 120,561 L 136,578 L 153,587 L 157,583 L 270,430",
        "length": 238
      },
      {
        "name": "三笔",
        "path": "M 394,165 L 407,174 L 420,192 L 407,255 L 374,334 L 350,372 L 310,418",
        "length": 294
      },
      {
        "name": "四笔",
        "path": "M 397,334 L 543,296 L 573,300 L 586,315 L 583,327 L 512,401",
        "length": 316
      },
      {
        "name": "五笔",
        "path": "M 386,417 L 412,442 L 411,464 L 399,525 L 371,587 L 339,623 L 314,642 L 266,667 L 219,680",
        "length": 371
      },
      {
        "name": "六笔",
        "path": "M 430,494 L 433,513 L 472,563 L 516,613 L 558,651 L 582,669 L 680,685",
        "length": 335
      }
    ]
  },
  "granule": {
    "id": "granule",
    "character": "粒",
    "pinyin": "lì",
    "teochewIPA": "liah⁸",
    "teochewAudio": "/audio/liep8.mp3",
    "triggerName": "每次两粒",
    "imageUrl": "/images/items/granule.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 173,293 L 211,334 L 215,351",
        "length": 73
      },
      {
        "name": "二笔",
        "path": "M 344,257 L 358,272 L 320,334",
        "length": 93
      },
      {
        "name": "三笔",
        "path": "M 127,428 L 159,432 L 313,395 L 349,391 L 363,393",
        "length": 241
      },
      {
        "name": "四笔",
        "path": "M 249,165 L 281,199 L 275,486 L 264,636 L 265,685",
        "length": 533
      },
      {
        "name": "五笔",
        "path": "M 259,425 L 242,464 L 205,521 L 168,566 L 126,608",
        "length": 228
      },
      {
        "name": "六笔",
        "path": "M 291,465 L 301,474 L 336,486 L 348,501 L 348,506",
        "length": 75
      },
      {
        "name": "七笔",
        "path": "M 447,195 L 510,231 L 529,258",
        "length": 106
      },
      {
        "name": "八笔",
        "path": "M 402,364 L 439,367 L 567,337 L 602,335",
        "length": 204
      },
      {
        "name": "九笔",
        "path": "M 405,452 L 428,489 L 436,513",
        "length": 69
      },
      {
        "name": "十笔",
        "path": "M 532,406 L 541,412 L 553,432 L 519,526 L 503,563 L 494,572",
        "length": 187
      },
      {
        "name": "十一笔",
        "path": "M 324,601 L 356,607 L 457,591 L 607,575 L 646,576 L 674,586",
        "length": 354
      }
    ]
  },
  "meal_time": {
    "id": "meal_time",
    "character": "饭",
    "pinyin": "fàn",
    "teochewIPA": "pn̄g⁷",
    "teochewAudio": "/audio/pung7.mp3",
    "triggerName": "饭后护胃",
    "imageUrl": "/images/items/meal_time.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 234,165 L 245,174 L 261,197 L 223,283 L 154,400 L 110,459 L 82,486",
        "length": 385
      },
      {
        "name": "二笔",
        "path": "M 223,324 L 299,304 L 319,304 L 335,310 L 302,374 L 279,404",
        "length": 225
      },
      {
        "name": "三笔",
        "path": "M 208,401 L 223,416 L 233,436 L 232,518 L 221,600 L 225,624 L 251,618 L 326,570",
        "length": 348
      },
      {
        "name": "四笔",
        "path": "M 614,227 L 603,223 L 566,223 L 540,245 L 481,280 L 459,288 L 453,285",
        "length": 181
      },
      {
        "name": "五笔",
        "path": "M 403,282 L 428,304 L 431,311 L 427,412 L 409,511 L 392,559 L 366,606 L 321,654 L 285,677",
        "length": 456
      },
      {
        "name": "六笔",
        "path": "M 444,433 L 507,422 L 551,404 L 566,404 L 594,411 L 568,509 L 546,558 L 523,592 L 459,644 L 415,661 L 397,663",
        "length": 499
      },
      {
        "name": "七笔",
        "path": "M 450,504 L 473,512 L 549,601 L 627,672 L 718,685",
        "length": 339
      }
    ]
  },
  "stop_med": {
    "id": "stop_med",
    "character": "止",
    "pinyin": "zhǐ",
    "teochewIPA": "tsí²",
    "teochewAudio": "/audio/tsi2.mp3",
    "triggerName": "痛止即停",
    "imageUrl": "/images/items/stop_med.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 363,165 L 406,198 L 407,223 L 399,621 L 383,635",
        "length": 499
      },
      {
        "name": "二笔",
        "path": "M 426,403 L 442,410 L 461,409 L 581,381 L 617,382",
        "length": 196
      },
      {
        "name": "三笔",
        "path": "M 195,393 L 231,430 L 248,638 L 260,645",
        "length": 274
      },
      {
        "name": "四笔",
        "path": "M 96,676 L 139,685 L 342,658 L 621,637 L 678,645 L 704,656",
        "length": 614
      }
    ]
  },
  "care_body": {
    "id": "care_body",
    "character": "护",
    "pinyin": "hù",
    "teochewIPA": "hū⁷",
    "teochewAudio": "/audio/hu6.mp3",
    "triggerName": "保重护理",
    "imageUrl": "/images/items/care_body.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 199,340 L 237,341 L 353,305 L 390,301",
        "length": 197
      },
      {
        "name": "二笔",
        "path": "M 303,165 L 313,170 L 333,191 L 325,295 L 320,595 L 307,622 L 243,592 L 243,588 L 236,588",
        "length": 556
      },
      {
        "name": "三笔",
        "path": "M 154,523 L 184,525 L 266,460 L 372,384",
        "length": 265
      },
      {
        "name": "四笔",
        "path": "M 495,189 L 555,219 L 572,241",
        "length": 95
      },
      {
        "name": "五笔",
        "path": "M 473,324 L 481,331 L 605,298 L 625,300 L 642,319 L 623,369 L 602,381",
        "length": 262
      },
      {
        "name": "六笔",
        "path": "M 468,432 L 479,425 L 596,401 L 630,398 L 646,403",
        "length": 183
      },
      {
        "name": "七笔",
        "path": "M 427,313 L 447,330 L 451,344 L 448,430 L 436,499 L 420,561 L 398,615 L 371,660 L 350,685",
        "length": 404
      }
    ]
  },
  "body": {
    "id": "body",
    "character": "身",
    "pinyin": "shēn",
    "teochewIPA": "sing¹",
    "teochewAudio": "/audio/sing1.mp3",
    "triggerName": "身体安康",
    "imageUrl": "/images/items/body.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 398,165 L 405,169 L 414,186 L 357,262 L 348,266",
        "length": 132
      },
      {
        "name": "二笔",
        "path": "M 313,260 L 330,278 L 335,306 L 335,467 L 325,476",
        "length": 228
      },
      {
        "name": "三笔",
        "path": "M 347,271 L 359,280 L 370,278 L 421,269 L 478,254 L 493,263 L 502,274 L 501,614 L 495,671 L 485,685 L 476,683 L 406,653",
        "length": 669
      },
      {
        "name": "四笔",
        "path": "M 353,356 L 374,345 L 398,341 L 429,335 L 450,338",
        "length": 101
      },
      {
        "name": "五笔",
        "path": "M 353,418 L 359,412 L 404,402 L 430,398 L 450,401",
        "length": 101
      },
      {
        "name": "六笔",
        "path": "M 208,500 L 243,517 L 309,499 L 477,465 L 482,458",
        "length": 287
      },
      {
        "name": "七笔",
        "path": "M 587,327 L 595,347 L 598,366 L 595,371 L 537,438 L 473,499 L 362,581 L 295,622 L 202,663",
        "length": 542
      }
    ]
  }
}
};
