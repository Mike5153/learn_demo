import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：墟市采买 (菜市秤钱)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const marketSceneConfig: SceneConfig = {
  id: 'market',
  name: '墟市采买',
  subtitle: '菜市秤钱',
  icon: '🧺',
  hintText: '👆 点菜摊物事识字',
  backText: '菜市',
  liquidType: 'water',
  defaultWordId: 'buy',
  words: {
  "buy": {
    "id": "buy",
    "character": "买",
    "pinyin": "mǎi",
    "teochewIPA": "bué²",
    "teochewAudio": "/audio/boi2.mp3",
    "triggerName": "赶集挑选",
    "imageUrl": "/images/items/buy.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 205,202 L 222,208 L 243,208 L 419,176 L 524,165 L 552,176 L 566,196 L 511,264",
        "length": 465
      },
      {
        "name": "二笔",
        "path": "M 279,263 L 323,295 L 331,307",
        "length": 69
      },
      {
        "name": "三笔",
        "path": "M 228,338 L 282,370 L 305,401",
        "length": 101
      },
      {
        "name": "四笔",
        "path": "M 161,478 L 201,485 L 327,464 L 582,437 L 639,451",
        "length": 483
      },
      {
        "name": "五笔",
        "path": "M 380,235 L 406,250 L 423,274 L 405,438 L 394,486 L 374,537 L 342,583 L 294,623 L 245,649 L 167,675",
        "length": 585
      },
      {
        "name": "六笔",
        "path": "M 420,493 L 421,504 L 502,570 L 560,627 L 580,658 L 588,685",
        "length": 262
      }
    ]
  },
  "sell": {
    "id": "sell",
    "character": "卖",
    "pinyin": "mài",
    "teochewIPA": "buê⁷",
    "teochewAudio": "/audio/boi7.mp3",
    "triggerName": "摊贩叫卖",
    "imageUrl": "/images/items/sell.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 285,242 L 322,248 L 417,237 L 469,224 L 496,222 L 510,225",
        "length": 228
      },
      {
        "name": "二笔",
        "path": "M 377,165 L 400,188 L 392,292 L 389,300 L 381,306",
        "length": 155
      },
      {
        "name": "三笔",
        "path": "M 203,341 L 218,346 L 241,345 L 332,327 L 481,306 L 515,305 L 535,313 L 546,332 L 502,384",
        "length": 428
      },
      {
        "name": "四笔",
        "path": "M 279,376 L 319,400 L 333,414",
        "length": 66
      },
      {
        "name": "五笔",
        "path": "M 251,432 L 295,460 L 314,486",
        "length": 84
      },
      {
        "name": "六笔",
        "path": "M 162,537 L 194,543 L 326,523 L 584,497 L 638,510",
        "length": 481
      },
      {
        "name": "七笔",
        "path": "M 374,354 L 389,361 L 407,386 L 396,493 L 374,563 L 347,600 L 302,635 L 237,663 L 229,662 L 224,666 L 194,673",
        "length": 447
      },
      {
        "name": "八笔",
        "path": "M 408,536 L 408,544 L 461,584 L 522,641 L 540,665 L 547,685",
        "length": 209
      }
    ]
  },
  "scale": {
    "id": "scale",
    "character": "秤",
    "pinyin": "chèng",
    "teochewIPA": "tsshìn³",
    "teochewAudio": "/audio/tshing3.mp3",
    "triggerName": "提杆铜秤",
    "imageUrl": "/images/items/scale.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 355,186 L 311,182 L 267,215 L 197,250 L 191,250 L 188,255 L 175,256 L 169,261",
        "length": 210
      },
      {
        "name": "二笔",
        "path": "M 142,354 L 175,357 L 307,321 L 354,321",
        "length": 217
      },
      {
        "name": "三笔",
        "path": "M 255,238 L 266,245 L 274,257 L 272,470 L 265,571 L 273,625",
        "length": 396
      },
      {
        "name": "四笔",
        "path": "M 257,354 L 252,359 L 244,393 L 220,433 L 167,501 L 124,545",
        "length": 236
      },
      {
        "name": "五笔",
        "path": "M 287,405 L 298,417 L 328,434 L 339,457",
        "length": 76
      },
      {
        "name": "六笔",
        "path": "M 423,191 L 462,193 L 500,186 L 571,165 L 602,166",
        "length": 183
      },
      {
        "name": "七笔",
        "path": "M 382,288 L 420,324 L 427,348",
        "length": 77
      },
      {
        "name": "八笔",
        "path": "M 607,245 L 620,268 L 544,339",
        "length": 130
      },
      {
        "name": "九笔",
        "path": "M 365,415 L 400,420 L 535,398 L 627,389 L 676,400",
        "length": 315
      },
      {
        "name": "十笔",
        "path": "M 465,212 L 494,228 L 500,257 L 497,685",
        "length": 491
      }
    ]
  },
  "money": {
    "id": "money",
    "character": "钱",
    "pinyin": "qián",
    "teochewIPA": "tsîⁿ⁵",
    "teochewAudio": "/audio/tsi~5.mp3",
    "triggerName": "找零钞票",
    "imageUrl": "/images/items/money.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 273,165 L 289,181 L 298,195 L 255,287 L 182,395 L 155,430 L 108,479",
        "length": 383
      },
      {
        "name": "二笔",
        "path": "M 255,322 L 271,314 L 300,310 L 351,295 L 382,293",
        "length": 131
      },
      {
        "name": "三笔",
        "path": "M 209,414 L 235,417 L 311,396 L 347,393",
        "length": 141
      },
      {
        "name": "四笔",
        "path": "M 171,526 L 186,529 L 221,524 L 317,490 L 353,486",
        "length": 189
      },
      {
        "name": "五笔",
        "path": "M 244,433 L 264,442 L 270,452 L 271,542 L 263,622 L 266,645 L 295,635 L 364,581",
        "length": 345
      },
      {
        "name": "六笔",
        "path": "M 401,353 L 425,356 L 457,352 L 551,324 L 590,320",
        "length": 194
      },
      {
        "name": "七笔",
        "path": "M 380,448 L 417,452 L 602,408 L 637,411",
        "length": 263
      },
      {
        "name": "八笔",
        "path": "M 421,172 L 443,181 L 461,198 L 477,348 L 503,462 L 526,528 L 552,583 L 592,640 L 622,669 L 650,684 L 659,685 L 671,662 L 692,556",
        "length": 733
      },
      {
        "name": "九笔",
        "path": "M 593,460 L 602,481 L 601,491 L 563,555 L 541,581 L 474,637 L 437,657 L 385,677",
        "length": 326
      },
      {
        "name": "十笔",
        "path": "M 549,201 L 604,233 L 625,260",
        "length": 98
      }
    ]
  },
  "catty": {
    "id": "catty",
    "character": "斤",
    "pinyin": "jīn",
    "teochewIPA": "keng¹",
    "teochewAudio": "/audio/kurng1.mp3",
    "triggerName": "市斤计重",
    "imageUrl": "/images/items/catty.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 498,172 L 447,165 L 391,200 L 340,222 L 330,226 L 326,223",
        "length": 189
      },
      {
        "name": "二笔",
        "path": "M 269,215 L 284,225 L 299,242 L 297,353 L 292,396 L 282,449 L 259,508 L 239,540 L 199,585 L 166,606",
        "length": 449
      },
      {
        "name": "三笔",
        "path": "M 319,348 L 327,342 L 421,324 L 577,298 L 603,298 L 634,306",
        "length": 322
      },
      {
        "name": "四笔",
        "path": "M 443,340 L 471,356 L 469,685",
        "length": 361
      }
    ]
  },
  "yuan": {
    "id": "yuan",
    "character": "元",
    "pinyin": "yuán",
    "teochewIPA": "îⁿ⁵",
    "teochewAudio": "/audio/ngueng5.mp3",
    "triggerName": "标价银元",
    "imageUrl": "/images/items/yuan.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 265,202 L 290,206 L 332,202 L 442,171 L 499,165",
        "length": 239
      },
      {
        "name": "二笔",
        "path": "M 145,386 L 188,391 L 516,311 L 551,308 L 579,312",
        "length": 444
      },
      {
        "name": "三笔",
        "path": "M 266,401 L 284,412 L 287,427 L 268,488 L 227,564 L 171,630 L 111,676 L 94,684",
        "length": 368
      },
      {
        "name": "四笔",
        "path": "M 384,366 L 407,378 L 417,400 L 405,506 L 405,579 L 420,643 L 447,668 L 500,681 L 566,685 L 647,678 L 698,661 L 706,655 L 706,643 L 703,528",
        "length": 725
      }
    ]
  },
  "liang": {
    "id": "liang",
    "character": "两",
    "pinyin": "liǎng",
    "teochewIPA": "niú²",
    "teochewAudio": "/audio/liang2.mp3",
    "triggerName": "秤星两数",
    "imageUrl": "/images/items/liang.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 217,202 L 257,211 L 546,165 L 600,171",
        "length": 388
      },
      {
        "name": "二笔",
        "path": "M 149,351 L 172,373 L 179,399 L 179,539 L 164,638 L 167,685",
        "length": 346
      },
      {
        "name": "三笔",
        "path": "M 207,391 L 218,376 L 422,344 L 606,327 L 621,328 L 639,339 L 651,356 L 649,508 L 641,603 L 631,650 L 609,684 L 576,676 L 499,639",
        "length": 922
      },
      {
        "name": "四笔",
        "path": "M 292,227 L 321,252 L 318,309 L 304,391 L 276,471 L 243,523 L 227,541",
        "length": 349
      },
      {
        "name": "五笔",
        "path": "M 303,454 L 355,497 L 367,521",
        "length": 94
      },
      {
        "name": "六笔",
        "path": "M 439,207 L 463,222 L 469,234 L 465,312 L 456,380 L 433,462 L 408,520 L 357,593",
        "length": 426
      },
      {
        "name": "七笔",
        "path": "M 467,452 L 467,461 L 537,515 L 550,532 L 558,556",
        "length": 144
      }
    ]
  },
  "much": {
    "id": "much",
    "character": "多",
    "pinyin": "duō",
    "teochewIPA": "tsē⁷",
    "teochewAudio": "/audio/to1.mp3",
    "triggerName": "添多添满",
    "imageUrl": "/images/items/much.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 408,165 L 419,189 L 394,224 L 344,272 L 327,284 L 283,304",
        "length": 208
      },
      {
        "name": "二笔",
        "path": "M 413,230 L 498,226 L 519,236 L 507,258 L 484,286 L 419,350 L 337,408 L 276,438",
        "length": 429
      },
      {
        "name": "三笔",
        "path": "M 339,289 L 368,305 L 376,314 L 383,329",
        "length": 62
      },
      {
        "name": "四笔",
        "path": "M 478,375 L 461,378 L 425,422 L 363,475 L 324,500 L 303,508",
        "length": 224
      },
      {
        "name": "五笔",
        "path": "M 440,430 L 522,414 L 552,419 L 559,430 L 528,482 L 492,535 L 428,599 L 380,634 L 328,661 L 288,676 L 241,685",
        "length": 551
      },
      {
        "name": "六笔",
        "path": "M 353,494 L 365,498 L 399,525 L 414,550",
        "length": 85
      }
    ]
  },
  "little": {
    "id": "little",
    "character": "少",
    "pinyin": "shǎo",
    "teochewIPA": "tsió²",
    "teochewAudio": "/audio/tsie2.mp3",
    "triggerName": "少取适量",
    "imageUrl": "/images/items/little.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 375,165 L 387,171 L 405,194 L 397,364 L 399,448",
        "length": 297
      },
      {
        "name": "二笔",
        "path": "M 270,298 L 258,349 L 220,430",
        "length": 142
      },
      {
        "name": "三笔",
        "path": "M 520,281 L 583,325 L 598,341 L 610,372",
        "length": 132
      },
      {
        "name": "四笔",
        "path": "M 497,368 L 507,391 L 507,403 L 460,487 L 402,558 L 355,600 L 314,627 L 247,663 L 190,685",
        "length": 474
      }
    ]
  },
  "costly": {
    "id": "costly",
    "character": "贵",
    "pinyin": "guì",
    "teochewIPA": "kuì³",
    "teochewAudio": "/audio/kui3.mp3",
    "triggerName": "菜贵肉贵",
    "imageUrl": "/images/items/costly.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 275,238 L 292,254 L 311,345",
        "length": 116
      },
      {
        "name": "二笔",
        "path": "M 308,241 L 321,248 L 479,220 L 492,226 L 503,241 L 490,276 L 475,284",
        "length": 262
      },
      {
        "name": "三笔",
        "path": "M 322,329 L 328,324 L 347,321 L 475,303 L 498,302 L 512,307",
        "length": 194
      },
      {
        "name": "四笔",
        "path": "M 374,165 L 393,179 L 400,188 L 396,342 L 387,354",
        "length": 204
      },
      {
        "name": "五笔",
        "path": "M 159,393 L 184,397 L 200,396 L 268,383 L 413,363 L 580,344 L 607,345 L 641,354",
        "length": 487
      },
      {
        "name": "六笔",
        "path": "M 303,423 L 314,436 L 322,453 L 315,593",
        "length": 176
      },
      {
        "name": "七笔",
        "path": "M 328,426 L 348,431 L 437,411 L 445,413 L 458,424 L 464,436 L 461,467 L 462,540 L 457,584",
        "length": 299
      },
      {
        "name": "八笔",
        "path": "M 361,461 L 375,467 L 390,483 L 383,560 L 372,598 L 358,622 L 329,649 L 282,672 L 253,678",
        "length": 303
      },
      {
        "name": "九笔",
        "path": "M 424,609 L 462,631 L 493,654 L 511,685",
        "length": 118
      }
    ]
  },
  "cheap": {
    "id": "cheap",
    "character": "便",
    "pinyin": "pián",
    "teochewIPA": "pêⁿ⁵",
    "teochewAudio": "/audio/ping7.mp3",
    "triggerName": "便宜得益",
    "imageUrl": "/images/items/cheap.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 248,165 L 259,175 L 272,199 L 240,263 L 174,364 L 105,445 L 87,460",
        "length": 364
      },
      {
        "name": "二笔",
        "path": "M 207,349 L 210,367 L 224,388 L 225,407 L 222,569 L 214,640 L 218,684",
        "length": 340
      },
      {
        "name": "三笔",
        "path": "M 364,206 L 411,210 L 522,184 L 550,180 L 566,182",
        "length": 206
      },
      {
        "name": "四笔",
        "path": "M 308,315 L 323,326 L 333,341 L 365,476",
        "length": 175
      },
      {
        "name": "五笔",
        "path": "M 337,314 L 354,320 L 552,284 L 579,284 L 594,289 L 613,318 L 590,367 L 556,454",
        "length": 444
      },
      {
        "name": "六笔",
        "path": "M 390,389 L 425,385 L 494,369 L 515,367 L 530,371",
        "length": 143
      },
      {
        "name": "七笔",
        "path": "M 379,467 L 387,459 L 497,443 L 530,442 L 537,449",
        "length": 165
      },
      {
        "name": "八笔",
        "path": "M 421,227 L 452,237 L 458,249 L 455,454 L 449,516 L 441,550 L 423,590 L 397,617 L 338,651 L 280,671",
        "length": 559
      },
      {
        "name": "九笔",
        "path": "M 291,500 L 325,502 L 358,517 L 398,544 L 456,594 L 582,678 L 658,685 L 713,684",
        "length": 478
      }
    ]
  },
  "change_money": {
    "id": "change_money",
    "character": "找",
    "pinyin": "zhǎo",
    "teochewIPA": "tshe⁷",
    "teochewAudio": "/audio/tau2.mp3",
    "triggerName": "清点找零",
    "imageUrl": "/images/items/change_money.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 161,363 L 202,363 L 274,345 L 310,331 L 356,327",
        "length": 200
      },
      {
        "name": "二笔",
        "path": "M 255,172 L 266,178 L 287,200 L 281,321 L 283,631 L 279,652 L 268,673 L 240,664 L 196,640 L 194,636 L 187,636",
        "length": 610
      },
      {
        "name": "三笔",
        "path": "M 116,560 L 149,564 L 238,497 L 348,422",
        "length": 278
      },
      {
        "name": "四笔",
        "path": "M 364,371 L 413,370 L 482,349 L 551,321 L 568,318 L 586,320",
        "length": 231
      },
      {
        "name": "五笔",
        "path": "M 421,165 L 434,173 L 452,197 L 451,257 L 457,337 L 480,449 L 511,532 L 552,604 L 589,650 L 611,669 L 634,682 L 654,685 L 672,633 L 684,558",
        "length": 737
      },
      {
        "name": "六笔",
        "path": "M 568,396 L 578,418 L 576,430 L 536,490 L 499,530 L 473,551 L 424,581 L 350,610",
        "length": 333
      },
      {
        "name": "七笔",
        "path": "M 526,202 L 587,234 L 606,258",
        "length": 99
      }
    ]
  },
  "city_market": {
    "id": "city_market",
    "character": "市",
    "pinyin": "shì",
    "teochewIPA": "tsshî⁷",
    "teochewAudio": "/audio/tshi6.mp3",
    "triggerName": "热闹墟市",
    "imageUrl": "/images/items/city_market.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 351,165 L 404,197 L 418,218",
        "length": 87
      },
      {
        "name": "二笔",
        "path": "M 172,292 L 186,298 L 209,302 L 344,277 L 562,249 L 590,251 L 628,264",
        "length": 464
      },
      {
        "name": "三笔",
        "path": "M 259,370 L 275,382 L 279,395 L 281,442 L 272,506 L 274,538",
        "length": 177
      },
      {
        "name": "四笔",
        "path": "M 294,374 L 303,382 L 494,352 L 507,353 L 515,359 L 522,373 L 521,476 L 514,502 L 508,510 L 503,510 L 474,503 L 445,492",
        "length": 450
      },
      {
        "name": "五笔",
        "path": "M 368,290 L 395,306 L 392,685",
        "length": 410
      }
    ]
  }
}
};
