import type { SceneConfig } from '../../types/literacy';

/**
 * 场景：堂前儿孙 (天伦合家)
 * 收录 13 个核心生活用字（双梯次渐进式识字架构）
 */
export const familySceneConfig: SceneConfig = {
  id: 'family',
  name: '堂前儿孙',
  subtitle: '天伦合家',
  icon: '👨‍👩‍👧‍👦',
  hintText: '👆 点堂前人物识字',
  backText: '堂前',
  liquidType: 'tea',
  defaultWordId: 'grandson',
  words: {
  "grandson": {
    "id": "grandson",
    "character": "孙",
    "pinyin": "sūn",
    "teochewIPA": "sun¹",
    "teochewAudio": "/audio/sung1.mp3",
    "triggerName": "承欢小孙",
    "imageUrl": "/images/items/grandson.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 111,206 L 150,216 L 278,167 L 298,165 L 317,174 L 329,189 L 318,210 L 257,287 L 254,296 L 246,296",
        "length": 377
      },
      {
        "name": "二笔",
        "path": "M 210,301 L 221,304 L 243,325 L 268,393 L 279,505 L 275,591 L 256,658 L 243,674 L 225,685 L 160,646",
        "length": 500
      },
      {
        "name": "三笔",
        "path": "M 46,507 L 92,515 L 330,388",
        "length": 316
      },
      {
        "name": "四笔",
        "path": "M 497,174 L 537,214 L 541,545 L 537,633 L 525,666 L 516,672 L 416,627",
        "length": 631
      },
      {
        "name": "五笔",
        "path": "M 407,400 L 394,448 L 360,521",
        "length": 130
      },
      {
        "name": "六笔",
        "path": "M 647,379 L 733,455 L 748,479 L 754,506",
        "length": 171
      }
    ]
  },
  "child": {
    "id": "child",
    "character": "仔",
    "pinyin": "zǐ",
    "teochewIPA": "kiã²",
    "teochewAudio": "/audio/kia~2.mp3",
    "triggerName": "亲爱伲仔",
    "imageUrl": "/images/items/child.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 266,165 L 278,176 L 292,201 L 255,270 L 173,390 L 126,446 L 85,481",
        "length": 396
      },
      {
        "name": "二笔",
        "path": "M 223,354 L 227,377 L 235,391 L 237,448 L 224,640 L 228,684",
        "length": 333
      },
      {
        "name": "三笔",
        "path": "M 355,261 L 372,268 L 396,270 L 520,227 L 538,226 L 554,235 L 566,249 L 562,257 L 496,334 L 494,342 L 486,348",
        "length": 357
      },
      {
        "name": "四笔",
        "path": "M 459,340 L 476,360 L 492,390 L 503,439 L 511,560 L 501,640 L 487,673 L 475,685 L 378,646",
        "length": 470
      },
      {
        "name": "五笔",
        "path": "M 292,445 L 321,452 L 342,451 L 434,434 L 657,413 L 687,417 L 715,427",
        "length": 428
      }
    ]
  },
  "grandfather": {
    "id": "grandfather",
    "character": "公",
    "pinyin": "gōng",
    "teochewIPA": "ang¹",
    "teochewAudio": "/audio/kong1.mp3",
    "triggerName": "慈祥阿公",
    "imageUrl": "/images/items/grandfather.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 250,261 L 274,290 L 238,362 L 180,439 L 118,497 L 76,525",
        "length": 350
      },
      {
        "name": "二笔",
        "path": "M 363,165 L 395,179 L 413,199 L 504,342 L 564,410 L 583,425 L 597,429 L 648,442 L 724,454",
        "length": 490
      },
      {
        "name": "三笔",
        "path": "M 328,427 L 344,445 L 352,457 L 350,462 L 304,548 L 252,621 L 243,649 L 274,652 L 339,635 L 459,613 L 481,618",
        "length": 503
      },
      {
        "name": "四笔",
        "path": "M 440,530 L 497,590 L 528,632 L 541,668 L 540,685",
        "length": 190
      }
    ]
  },
  "grandmother": {
    "id": "grandmother",
    "character": "婆",
    "pinyin": "pó",
    "teochewIPA": "pô⁵",
    "teochewAudio": "/audio/po5.mp3",
    "triggerName": "可敬阿婆",
    "imageUrl": "/images/items/grandmother.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 239,209 L 274,226 L 284,233 L 295,247",
        "length": 69
      },
      {
        "name": "二笔",
        "path": "M 207,289 L 246,312 L 252,322",
        "length": 57
      },
      {
        "name": "三笔",
        "path": "M 239,463 L 233,437 L 260,397 L 294,336",
        "length": 145
      },
      {
        "name": "四笔",
        "path": "M 373,275 L 383,264 L 510,236 L 533,236 L 545,248 L 513,290",
        "length": 238
      },
      {
        "name": "五笔",
        "path": "M 339,250 L 354,265 L 355,276 L 351,316 L 342,360 L 325,409 L 299,450 L 287,461",
        "length": 234
      },
      {
        "name": "六笔",
        "path": "M 421,165 L 433,173 L 443,186 L 438,299 L 429,316",
        "length": 163
      },
      {
        "name": "七笔",
        "path": "M 384,332 L 429,328 L 463,316 L 480,317 L 489,323 L 479,356 L 456,394 L 441,409 L 411,426 L 373,436",
        "length": 283
      },
      {
        "name": "八笔",
        "path": "M 388,358 L 417,372 L 467,415 L 513,441 L 536,449 L 604,449",
        "length": 243
      },
      {
        "name": "九笔",
        "path": "M 352,453 L 360,462 L 363,477 L 307,573 L 326,584 L 379,600 L 463,639 L 492,654 L 524,685",
        "length": 386
      },
      {
        "name": "十笔",
        "path": "M 442,490 L 454,501 L 456,509 L 447,541 L 420,588 L 391,618 L 367,634 L 329,649 L 279,658 L 261,657",
        "length": 292
      },
      {
        "name": "十一笔",
        "path": "M 163,533 L 197,539 L 367,517 L 576,500 L 609,501 L 637,511",
        "length": 478
      }
    ]
  },
  "home": {
    "id": "home",
    "character": "家",
    "pinyin": "jiā",
    "teochewIPA": "ke¹",
    "teochewAudio": "/audio/khia1.mp3",
    "triggerName": "温馨老家",
    "imageUrl": "/images/items/home.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 322,165 L 372,190 L 390,208",
        "length": 81
      },
      {
        "name": "二笔",
        "path": "M 186,256 L 192,274 L 191,286 L 163,333 L 160,365",
        "length": 118
      },
      {
        "name": "三笔",
        "path": "M 209,278 L 223,285 L 243,284 L 397,253 L 477,242 L 500,242 L 521,251 L 533,267 L 489,323",
        "length": 411
      },
      {
        "name": "四笔",
        "path": "M 251,350 L 281,354 L 400,330 L 437,332",
        "length": 189
      },
      {
        "name": "五笔",
        "path": "M 334,379 L 314,380 L 255,435 L 217,458 L 185,471",
        "length": 180
      },
      {
        "name": "六笔",
        "path": "M 300,421 L 310,421 L 329,433 L 354,456 L 369,477 L 385,513 L 390,538 L 391,597 L 382,650 L 375,666 L 362,685 L 347,684 L 283,657",
        "length": 395
      },
      {
        "name": "七笔",
        "path": "M 310,435 L 313,458 L 294,478 L 241,519 L 194,541",
        "length": 170
      },
      {
        "name": "八笔",
        "path": "M 357,482 L 349,515 L 298,564 L 234,610 L 163,641",
        "length": 261
      },
      {
        "name": "九笔",
        "path": "M 452,382 L 465,403 L 422,447 L 389,475",
        "length": 129
      },
      {
        "name": "十笔",
        "path": "M 387,478 L 406,502 L 457,550 L 506,588 L 543,610 L 563,615 L 640,615",
        "length": 303
      }
    ]
  },
  "joy": {
    "id": "joy",
    "character": "乐",
    "pinyin": "lè",
    "teochewIPA": "lah⁸",
    "teochewAudio": "/audio/lak8.mp3",
    "triggerName": "天伦之乐",
    "imageUrl": "/images/items/joy.svg",
    "tier": "basic",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 525,171 L 469,165 L 387,215 L 279,263 L 269,263 L 268,270",
        "length": 288
      },
      {
        "name": "二笔",
        "path": "M 206,243 L 222,256 L 236,279 L 216,440 L 249,441 L 342,421 L 481,404 L 578,403 L 619,420",
        "length": 619
      },
      {
        "name": "三笔",
        "path": "M 373,290 L 393,307 L 411,331 L 410,596 L 405,659 L 399,678 L 391,685 L 343,668 L 289,640",
        "length": 527
      },
      {
        "name": "四笔",
        "path": "M 237,531 L 210,584 L 166,638 L 155,657",
        "length": 151
      },
      {
        "name": "五笔",
        "path": "M 524,519 L 594,580 L 624,612 L 636,634 L 645,664",
        "length": 193
      }
    ]
  },
  "father": {
    "id": "father",
    "character": "父",
    "pinyin": "fù",
    "teochewIPA": "pê⁷",
    "teochewAudio": "/audio/pe7.mp3",
    "triggerName": "严父尊长",
    "imageUrl": "/images/items/father.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 249,191 L 264,207 L 270,221 L 258,244 L 231,281 L 191,324 L 140,360",
        "length": 230
      },
      {
        "name": "二笔",
        "path": "M 439,165 L 544,216 L 566,236 L 581,260",
        "length": 175
      },
      {
        "name": "三笔",
        "path": "M 405,311 L 430,349 L 422,408 L 393,497 L 352,561 L 297,607 L 245,634 L 184,653 L 108,665",
        "length": 546
      },
      {
        "name": "四笔",
        "path": "M 224,382 L 249,391 L 270,407 L 421,579 L 480,629 L 521,658 L 558,672 L 692,685",
        "length": 584
      }
    ]
  },
  "mother": {
    "id": "mother",
    "character": "母",
    "pinyin": "mǔ",
    "teochewIPA": "bó²",
    "teochewAudio": "/audio/bo2.mp3",
    "triggerName": "慈爱母亲",
    "imageUrl": "/images/items/mother.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 272,168 L 294,207 L 287,285 L 259,404 L 210,547 L 244,552 L 328,544 L 416,542 L 557,551 L 600,560 L 644,588",
        "length": 841
      },
      {
        "name": "二笔",
        "path": "M 320,188 L 332,196 L 426,175 L 493,165 L 511,171 L 533,196 L 523,447 L 511,533 L 489,624 L 471,666 L 458,685 L 436,677 L 387,645",
        "length": 813
      },
      {
        "name": "三笔",
        "path": "M 355,242 L 402,275 L 419,303",
        "length": 90
      },
      {
        "name": "四笔",
        "path": "M 96,395 L 132,403 L 312,379 L 629,355 L 670,360 L 704,371",
        "length": 613
      },
      {
        "name": "五笔",
        "path": "M 341,425 L 387,460 L 403,483",
        "length": 86
      }
    ]
  },
  "son": {
    "id": "son",
    "character": "儿",
    "pinyin": "ér",
    "teochewIPA": "jî⁵",
    "teochewAudio": "/audio/i~5.mp3",
    "triggerName": "归家儿子",
    "imageUrl": "/images/items/son.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 239,231 L 246,233 L 274,265 L 265,404 L 249,484 L 221,558 L 195,599 L 144,652 L 101,679",
        "length": 523
      },
      {
        "name": "二笔",
        "path": "M 404,165 L 426,179 L 452,216 L 438,547 L 446,616 L 463,653 L 498,674 L 532,683 L 562,685 L 634,682 L 684,663 L 693,656 L 697,625 L 699,524",
        "length": 888
      }
    ]
  },
  "filial": {
    "id": "filial",
    "character": "孝",
    "pinyin": "xiào",
    "teochewIPA": "hàu³",
    "teochewAudio": "/audio/hau3.mp3",
    "triggerName": "百善孝先",
    "imageUrl": "/images/items/filial.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 315,264 L 349,267 L 428,254 L 448,246 L 470,244 L 485,247",
        "length": 173
      },
      {
        "name": "二笔",
        "path": "M 388,165 L 412,188 L 405,319 L 395,334",
        "length": 182
      },
      {
        "name": "三笔",
        "path": "M 178,373 L 213,378 L 345,353 L 590,322 L 624,323 L 657,332",
        "length": 485
      },
      {
        "name": "四笔",
        "path": "M 521,188 L 532,205 L 536,225 L 533,232 L 489,295 L 427,368 L 347,445 L 285,495 L 209,548 L 143,582",
        "length": 578
      },
      {
        "name": "五笔",
        "path": "M 320,430 L 330,435 L 356,436 L 461,402 L 481,402 L 498,418 L 454,469 L 445,477 L 440,477",
        "length": 275
      },
      {
        "name": "六笔",
        "path": "M 403,475 L 429,491 L 440,510 L 450,566 L 449,631 L 438,666 L 419,685 L 368,659",
        "length": 295
      },
      {
        "name": "七笔",
        "path": "M 270,549 L 293,555 L 398,539 L 560,523 L 588,525 L 615,534",
        "length": 349
      }
    ]
  },
  "harmony": {
    "id": "harmony",
    "character": "和",
    "pinyin": "hé",
    "teochewIPA": "hô⁵",
    "teochewAudio": "/audio/ho5.mp3",
    "triggerName": "合家和气",
    "imageUrl": "/images/items/harmony.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 427,173 L 383,165 L 354,185 L 304,210 L 204,248",
        "length": 243
      },
      {
        "name": "二笔",
        "path": "M 148,356 L 168,361 L 192,360 L 400,312 L 432,314",
        "length": 290
      },
      {
        "name": "三笔",
        "path": "M 302,229 L 323,236 L 333,249 L 317,685",
        "length": 475
      },
      {
        "name": "四笔",
        "path": "M 310,349 L 296,397 L 269,439 L 213,510 L 143,576",
        "length": 287
      },
      {
        "name": "五笔",
        "path": "M 346,421 L 398,448 L 416,470",
        "length": 87
      },
      {
        "name": "六笔",
        "path": "M 443,346 L 465,367 L 467,375 L 492,547",
        "length": 212
      },
      {
        "name": "七笔",
        "path": "M 490,369 L 501,357 L 509,358 L 609,333 L 619,333 L 629,337 L 648,357 L 648,363 L 629,445 L 611,459",
        "length": 289
      },
      {
        "name": "八笔",
        "path": "M 504,506 L 516,494 L 604,479 L 638,477 L 657,483",
        "length": 160
      }
    ]
  },
  "bliss": {
    "id": "bliss",
    "character": "喜",
    "pinyin": "xǐ",
    "teochewIPA": "hí²",
    "teochewAudio": "/audio/hi2.mp3",
    "triggerName": "喜笑颜开",
    "imageUrl": "/images/items/bliss.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 260,237 L 275,242 L 307,242 L 410,230 L 502,212 L 534,212",
        "length": 277
      },
      {
        "name": "二笔",
        "path": "M 369,165 L 392,185 L 391,268 L 382,282",
        "length": 130
      },
      {
        "name": "三笔",
        "path": "M 304,302 L 328,307 L 451,285 L 479,289",
        "length": 178
      },
      {
        "name": "四笔",
        "path": "M 274,353 L 292,365 L 315,438",
        "length": 98
      },
      {
        "name": "五笔",
        "path": "M 310,353 L 316,360 L 325,358 L 461,332 L 472,336 L 485,350 L 475,373 L 460,381",
        "length": 230
      },
      {
        "name": "六笔",
        "path": "M 324,414 L 330,419 L 451,399 L 490,403",
        "length": 170
      },
      {
        "name": "七笔",
        "path": "M 281,447 L 316,477 L 323,496",
        "length": 66
      },
      {
        "name": "八笔",
        "path": "M 457,414 L 471,434 L 441,487 L 429,496",
        "length": 100
      },
      {
        "name": "九笔",
        "path": "M 152,531 L 188,541 L 365,516 L 589,495 L 637,507 L 648,516",
        "length": 505
      },
      {
        "name": "十笔",
        "path": "M 274,569 L 291,582 L 299,599 L 320,685",
        "length": 129
      },
      {
        "name": "十一笔",
        "path": "M 307,569 L 314,575 L 331,575 L 455,549 L 474,549 L 498,570 L 482,614 L 465,625",
        "length": 271
      },
      {
        "name": "十二笔",
        "path": "M 329,667 L 339,657 L 458,642 L 488,643 L 505,648",
        "length": 182
      }
    ]
  },
  "smooth": {
    "id": "smooth",
    "character": "顺",
    "pinyin": "shùn",
    "teochewIPA": "sùn⁷",
    "teochewAudio": "/audio/sung1.mp3",
    "triggerName": "顺心如意",
    "imageUrl": "/images/items/smooth.svg",
    "tier": "advanced",
    "strokes": [
      {
        "name": "一笔",
        "path": "M 175,245 L 194,261 L 200,276 L 200,337 L 194,409 L 184,461 L 165,515 L 139,565 L 122,587",
        "length": 369
      },
      {
        "name": "二笔",
        "path": "M 266,253 L 281,272 L 282,290 L 282,360 L 273,475 L 276,502",
        "length": 255
      },
      {
        "name": "三笔",
        "path": "M 335,165 L 352,179 L 366,204 L 364,472 L 356,566 L 357,623",
        "length": 470
      },
      {
        "name": "四笔",
        "path": "M 426,196 L 456,202 L 637,170 L 678,173",
        "length": 256
      },
      {
        "name": "五笔",
        "path": "M 550,219 L 526,225 L 507,265 L 501,270 L 500,280 L 495,282",
        "length": 92
      },
      {
        "name": "六笔",
        "path": "M 437,288 L 448,299 L 456,316 L 457,440 L 451,509 L 455,541",
        "length": 260
      },
      {
        "name": "七笔",
        "path": "M 469,297 L 480,301 L 498,300 L 596,278 L 608,282 L 625,303 L 621,362 L 623,504 L 619,545",
        "length": 412
      },
      {
        "name": "八笔",
        "path": "M 508,345 L 531,357 L 542,373 L 537,488 L 521,568 L 509,596 L 488,626 L 443,661 L 392,684",
        "length": 422
      },
      {
        "name": "九笔",
        "path": "M 564,582 L 640,638 L 656,654 L 669,685",
        "length": 151
      }
    ]
  }
}
};
