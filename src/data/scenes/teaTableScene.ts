import type { SceneConfig } from '../../types/literacy';

/**
 * 场景一：“厝内工夫” (传统潮汕工夫茶桌实景)
 * 包含两套进阶体系：
 * - 第一套 (基础核心 6 字)：茶 (dê⁵)、水 (zui²)、杯 (buê¹)、火 (hué²)、叶 (hioh⁸)、甘 (gam¹)
 * - 第二套 (进阶拓展 7 字)：盘 (bûan⁵)、壶 (hû⁵)、冲 (tshong¹)、洗 (sói²)、香 (hiang¹)、热 (zuah⁸)、客 (kheh⁴)
 * 笔画采用权威 Hanzi Writer 书法中线平滑矢量轨迹 (800×800)
 */
export const teaTableSceneConfig: SceneConfig = {
  id: 'tea_table',
  name: '厝内工夫',
  subtitle: '工夫茶桌',
  icon: '🍵',
  hintText: '👆 点茶具识字',
  backText: '茶盘',
  liquidType: 'tea',
  defaultWordId: 'tea',
  words: {
    tea: {
      id: 'tea',
      character: '茶',
      pinyin: 'chá',
      teochewIPA: 'dê⁵',
      teochewAudio: '/audio/te5.mp3',
      triggerName: '冲罐',
      imageUrl: '/images/items/tea.png',
      tier: 'basic',
      strokes: [
        { name: '一横', path: 'M 188,275 L 218,279 L 259,276 L 335,263 L 518,241 L 557,243 L 580,252', length: 397 },
        { name: '二竖', path: 'M 267,200 L 282,207 L 295,220 L 313,317', length: 134 },
        { name: '三竖', path: 'M 447,165 L 457,171 L 469,192 L 424,313', length: 165 },
        { name: '四撇', path: 'M 381,329 L 362,333 L 307,404 L 248,460 L 189,505 L 125,540', length: 338 },
        { name: '五捺', path: 'M 390,343 L 392,352 L 403,362 L 449,403 L 507,446 L 552,472 L 590,481 L 675,487', length: 334 },
        { name: '六横', path: 'M 254,518 L 279,523 L 317,521 L 452,494 L 485,496', length: 234 },
        { name: '七竖钩', path: 'M 353,421 L 382,450 L 380,661 L 368,685 L 336,673 L 302,653', length: 352 },
        { name: '八撇', path: 'M 268,589 L 248,628 L 211,679', length: 107 },
        { name: '九捺', path: 'M 451,575 L 525,632 L 538,652 L 545,675', length: 141 },
      ]
    },

    water: {
      id: 'water',
      character: '水',
      pinyin: 'shuǐ',
      teochewIPA: 'zui²',
      teochewAudio: '/audio/tsui2.mp3',
      triggerName: '砂铫',
      imageUrl: '/images/items/water.png',
      tier: 'basic',
      strokes: [
        { name: '一竖钩', path: 'M 347,165 L 365,178 L 379,195 L 371,407 L 370,652 L 355,685 L 326,676 L 278,652 L 277,647 L 270,647', length: 634 },
        { name: '二横撇', path: 'M 128,383 L 169,389 L 267,368 L 285,373 L 293,380 L 287,404 L 266,453 L 217,537 L 154,606 L 105,639', length: 499 },
        { name: '三撇', path: 'M 525,254 L 534,261 L 544,284 L 514,321 L 427,403 L 426,409', length: 210 },
        { name: '四捺', path: 'M 392,377 L 399,400 L 445,453 L 520,531 L 555,559 L 581,574 L 695,589', length: 392 },
      ]
    },

    cup: {
      id: 'cup',
      character: '杯',
      pinyin: 'bēi',
      teochewIPA: 'buê¹',
      teochewAudio: '/audio/pue1.mp3',
      triggerName: '若琛瓯',
      imageUrl: '/images/items/cup.png',
      tier: 'basic',
      strokes: [
        { name: '一横', path: 'M 157,366 L 172,370 L 206,367 L 273,352 L 321,336 L 355,337', length: 203 },
        { name: '二竖', path: 'M 257,165 L 289,199 L 284,463 L 273,619 L 273,671', length: 519 },
        { name: '三撇', path: 'M 267,371 L 254,419 L 223,471 L 183,526 L 130,584', length: 257 },
        { name: '四点', path: 'M 303,412 L 307,418 L 340,436 L 360,461', length: 77 },
        { name: '五横', path: 'M 384,303 L 417,305 L 491,288 L 602,268 L 633,268 L 662,275', length: 283 },
        { name: '六撇', path: 'M 494,303 L 513,318 L 514,328 L 488,391 L 461,437 L 418,498 L 367,556 L 330,585', length: 355 },
        { name: '七竖', path: 'M 465,386 L 490,424 L 492,443 L 491,554 L 484,644 L 488,685', length: 307 },
        { name: '八点', path: 'M 557,469 L 647,529 L 660,546 L 670,567', length: 153 },
      ]
    },

    fire: {
      id: 'fire',
      character: '火',
      pinyin: 'huǒ',
      teochewIPA: 'hué²',
      teochewAudio: '/audio/hue2.mp3',
      triggerName: '风炉',
      imageUrl: '/images/items/fire.png',
      tier: 'basic',
      strokes: [
        { name: '一点', path: 'M 165,331 L 223,396 L 235,431', length: 124 },
        { name: '二短撇', path: 'M 511,273 L 527,290 L 532,305 L 499,339 L 423,401', length: 185 },
        { name: '三长撇', path: 'M 318,165 L 345,179 L 360,193 L 365,207 L 354,394 L 342,479 L 332,511 L 305,567 L 271,606 L 209,648 L 136,677', length: 640 },
        { name: '四长捺', path: 'M 371,442 L 377,465 L 436,547 L 494,614 L 533,650 L 549,661 L 664,685', length: 403 },
      ]
    },

    leaf: {
      id: 'leaf',
      character: '叶',
      pinyin: 'yè',
      teochewIPA: 'hioh⁸',
      teochewAudio: '/audio/hiep8.mp3',
      triggerName: '茶仓',
      imageUrl: '/images/items/leaf.png',
      tier: 'basic',
      strokes: [
        { name: '一竖', path: 'M 152,317 L 170,332 L 174,340 L 199,482', length: 177 },
        { name: '二横折', path: 'M 192,331 L 203,322 L 260,304 L 274,304 L 285,311 L 291,318 L 278,390 L 263,402', length: 203 },
        { name: '三横', path: 'M 209,444 L 217,433 L 249,423 L 288,416 L 306,418', length: 105 },
        { name: '四横', path: 'M 321,390 L 353,394 L 450,376 L 591,355 L 648,366', length: 332 },
        { name: '五竖', path: 'M 436,165 L 453,170 L 475,191 L 470,313 L 469,685', length: 542 },
      ]
    },

    sweet: {
      id: 'sweet',
      character: '甘',
      pinyin: 'gān',
      teochewIPA: 'gam¹',
      teochewAudio: '/audio/kam1.mp3',
      triggerName: '橄榄',
      imageUrl: '/images/items/sweet.png',
      tier: 'basic',
      strokes: [
        { name: '一横', path: 'M 123,375 L 163,387 L 371,354 L 616,326 L 677,345', length: 563 },
        { name: '二竖', path: 'M 262,234 L 280,247 L 295,268 L 305,643', length: 423 },
        { name: '三竖', path: 'M 468,165 L 482,173 L 504,197 L 496,319 L 495,583 L 489,610 L 479,627 L 480,651 L 473,685', length: 541 },
        { name: '四横', path: 'M 322,462 L 327,469 L 341,469 L 411,458 L 440,459', length: 122 },
        { name: '五横', path: 'M 323,616 L 335,605 L 388,597 L 415,594 L 446,599', length: 128 },
      ]
    },

    tray: {
      id: 'tray',
      character: '盘',
      pinyin: 'pán',
      teochewIPA: 'bûan⁵',
      teochewAudio: '/audio/pan5.mp3',
      triggerName: '茶盘',
      imageUrl: '/images/items/tray.png',
      tier: 'advanced',
      strokes: [
        { name: '一撇', path: 'M 371,165 L 387,187 L 336,251 L 328,250', length: 117 },
        { name: '二竖', path: 'M 294,255 L 307,266 L 315,281 L 311,372 L 289,450 L 256,503', length: 269 },
        { name: '三横折', path: 'M 325,260 L 345,268 L 364,267 L 454,247 L 472,257 L 480,269 L 475,329 L 479,431 L 474,471 L 463,487 L 443,481 L 402,459', length: 457 },
        { name: '四横', path: 'M 362,298 L 387,310 L 405,325', length: 51 },
        { name: '五竖', path: 'M 162,371 L 198,377 L 367,356 L 569,341 L 590,342 L 632,355', length: 474 },
        { name: '六横', path: 'M 354,387 L 394,409 L 408,425', length: 67 },
        { name: '七竖', path: 'M 225,553 L 245,567 L 268,650 L 277,660', length: 124 },
        { name: '八横折', path: 'M 265,555 L 272,562 L 279,563 L 490,534 L 529,536 L 546,552 L 549,562 L 530,621 L 508,640', length: 394 },
        { name: '九竖', path: 'M 337,569 L 342,575 L 349,635 L 358,655', length: 90 },
        { name: '十竖', path: 'M 427,555 L 446,571 L 427,638 L 418,650', length: 109 },
        { name: '十一横', path: 'M 173,677 L 207,685 L 385,667 L 572,657 L 607,660 L 638,671', length: 469 },
      ]
    },

    pot: {
      id: 'pot',
      character: '壶',
      pinyin: 'hú',
      teochewIPA: 'hû⁵',
      teochewAudio: '/audio/hu5.mp3',
      triggerName: '西施壶',
      imageUrl: '/images/items/pot.png',
      tier: 'advanced',
      strokes: [
        { name: '一横', path: 'M 277,260 L 303,265 L 342,263 L 431,248 L 493,233 L 525,235', length: 252 },
        { name: '二竖', path: 'M 385,165 L 412,190 L 407,295 L 396,311', length: 161 },
        { name: '三横', path: 'M 300,334 L 331,339 L 466,317 L 501,321', length: 203 },
        { name: '四竖', path: 'M 214,388 L 218,398 L 218,422 L 186,478 L 184,511', length: 132 },
        { name: '五横折', path: 'M 238,406 L 251,416 L 265,415 L 402,390 L 544,373 L 569,375 L 592,386 L 600,400 L 552,460', length: 456 },
        { name: '六横', path: 'M 331,444 L 350,466 L 352,483 L 353,626 L 352,645 L 343,651', length: 219 },
        { name: '七点', path: 'M 426,423 L 445,447 L 444,617 L 443,632 L 432,642', length: 231 },
        { name: '八横撇', path: 'M 233,535 L 284,576 L 299,604', length: 97 },
        { name: '九竖钩', path: 'M 533,487 L 547,510 L 487,574 L 476,580', length: 127 },
        { name: '十点', path: 'M 191,677 L 226,685 L 374,666 L 548,654 L 578,656 L 616,668', length: 429 },
      ]
    },

    pour: {
      id: 'pour',
      character: '冲',
      pinyin: 'chōng',
      teochewIPA: 'tshong¹',
      teochewAudio: '/audio/cong1.mp3',
      triggerName: '高冲',
      imageUrl: '/images/items/pour.png',
      tier: 'advanced',
      strokes: [
        { name: '一点', path: 'M 203,202 L 256,237 L 268,250 L 278,270', length: 104 },
        { name: '二提', path: 'M 194,625 L 187,606 L 186,570 L 282,399', length: 252 },
        { name: '三竖', path: 'M 315,320 L 335,335 L 342,352 L 366,468', length: 162 },
        { name: '四横折', path: 'M 353,322 L 364,329 L 570,296 L 592,296 L 604,308 L 613,324 L 587,388 L 572,399 L 564,400', length: 375 },
        { name: '五横', path: 'M 378,454 L 389,445 L 547,423 L 598,422 L 614,427', length: 242 },
        { name: '六竖', path: 'M 436,165 L 453,170 L 477,192 L 471,298 L 468,685', length: 543 },
      ]
    },

    rinse: {
      id: 'rinse',
      character: '洗',
      pinyin: 'xǐ',
      teochewIPA: 'sói²',
      teochewAudio: '/audio/soi2.mp3',
      triggerName: '洗杯',
      imageUrl: '/images/items/rinse.png',
      tier: 'advanced',
      strokes: [
        { name: '一点', path: 'M 183,234 L 235,267 L 255,295', length: 96 },
        { name: '二点', path: 'M 133,374 L 187,406 L 199,424', length: 84 },
        { name: '三提', path: 'M 173,667 L 165,648 L 163,615 L 244,452', length: 236 },
        { name: '四撇', path: 'M 334,257 L 353,279 L 345,301 L 331,333 L 311,364 L 281,394', length: 167 },
        { name: '五横', path: 'M 357,328 L 421,321 L 527,294 L 560,296', length: 207 },
        { name: '六竖', path: 'M 418,165 L 443,186 L 449,198 L 442,410 L 431,423', length: 275 },
        { name: '七横折', path: 'M 270,459 L 299,463 L 415,440 L 569,419 L 598,421 L 618,428', length: 353 },
        { name: '八撇', path: 'M 373,482 L 385,506 L 367,555 L 352,582 L 330,612 L 292,649 L 260,673 L 236,685', length: 267 },
        { name: '九竖弯钩', path: 'M 447,450 L 466,466 L 458,577 L 462,640 L 469,655 L 494,674 L 534,683 L 579,683 L 614,677 L 645,664 L 660,651 L 667,566', length: 507 },
      ]
    },

    aroma: {
      id: 'aroma',
      character: '香',
      pinyin: 'xiāng',
      teochewIPA: 'hiang¹',
      teochewAudio: '/audio/hiang1.mp3',
      triggerName: '茶香',
      imageUrl: '/images/items/aroma.png',
      tier: 'advanced',
      strokes: [
        { name: '一撇', path: 'M 480,175 L 470,170 L 437,165 L 365,201 L 252,237', length: 244 },
        { name: '二横', path: 'M 185,324 L 220,328 L 329,307 L 531,282 L 584,293', length: 404 },
        { name: '三竖', path: 'M 363,219 L 389,237 L 383,397 L 387,435', length: 230 },
        { name: '四撇', path: 'M 367,318 L 349,332 L 300,390 L 263,421 L 190,469 L 130,493', length: 299 },
        { name: '五捺', path: 'M 404,315 L 502,393 L 552,425 L 595,434 L 670,440', length: 304 },
        { name: '六竖', path: 'M 279,469 L 296,485 L 301,510 L 302,552 L 293,649 L 294,685', length: 224 },
        { name: '七横折', path: 'M 315,476 L 324,483 L 335,482 L 454,456 L 471,467 L 480,478 L 482,656 L 474,670 L 435,659', length: 413 },
        { name: '八横', path: 'M 320,572 L 326,566 L 381,553 L 404,550 L 427,554', length: 112 },
        { name: '九横', path: 'M 312,663 L 328,653 L 415,641 L 436,642 L 450,649', length: 143 },
      ]
    },

    hot: {
      id: 'hot',
      character: '热',
      pinyin: 'rè',
      teochewIPA: 'zuah⁸',
      teochewAudio: '/audio/zuah8.mp3',
      triggerName: '热茶',
      imageUrl: '/images/items/hot.png',
      tier: 'advanced',
      strokes: [
        { name: '一横', path: 'M 188,328 L 216,329 L 325,294 L 356,292', length: 174 },
        { name: '二竖', path: 'M 284,172 L 307,190 L 310,200 L 303,268 L 302,492 L 291,516 L 219,489', length: 435 },
        { name: '三横', path: 'M 150,453 L 176,459 L 340,365', length: 216 },
        { name: '四竖', path: 'M 439,165 L 461,192 L 453,305 L 442,357 L 431,395 L 407,451 L 381,495 L 360,519', length: 385 },
        { name: '五横折', path: 'M 367,325 L 423,317 L 429,311 L 471,300 L 515,282 L 537,284 L 546,292 L 529,339 L 519,397 L 527,437 L 540,457 L 558,475 L 583,489 L 618,502 L 636,503 L 644,502 L 645,498 L 650,451 L 649,397', length: 587 },
        { name: '六横', path: 'M 377,382 L 458,431 L 475,447 L 481,461', length: 133 },
        { name: '七点', path: 'M 227,576 L 214,614 L 174,685', length: 122 },
        { name: '八点', path: 'M 317,587 L 341,625 L 350,652', length: 73 },
        { name: '九点', path: 'M 430,576 L 469,623 L 477,645', length: 84 },
        { name: '十点', path: 'M 538,562 L 584,602 L 613,634 L 622,652 L 628,677', length: 150 },
      ]
    },

    guest: {
      id: 'guest',
      character: '客',
      pinyin: 'kè',
      teochewIPA: 'kheh⁴',
      teochewAudio: '/audio/kheh4.mp3',
      triggerName: '茶客',
      imageUrl: '/images/items/guest.png',
      tier: 'advanced',
      strokes: [
        { name: '一点', path: 'M 347,165 L 387,194 L 401,219', length: 78 },
        { name: '二点', path: 'M 220,249 L 226,269 L 222,283 L 196,330 L 192,362', length: 121 },
        { name: '三横钩', path: 'M 243,283 L 251,277 L 362,258 L 508,240 L 532,250 L 542,264 L 499,315', length: 380 },
        { name: '四撇', path: 'M 310,303 L 322,325 L 300,364 L 259,410 L 236,429 L 206,447', length: 196 },
        { name: '五横撇', path: 'M 326,357 L 418,341 L 432,342 L 445,349 L 435,371 L 414,398 L 387,429 L 342,474 L 252,547 L 186,588 L 146,607', length: 523 },
        { name: '六捺', path: 'M 292,395 L 302,394 L 322,403 L 435,491 L 474,517 L 517,539 L 534,544 L 561,546 L 654,542', length: 408 },
        { name: '七竖', path: 'M 260,558 L 274,564 L 282,577 L 301,685', length: 140 },
        { name: '八横折', path: 'M 298,558 L 306,565 L 416,546 L 440,550 L 456,567 L 436,620 L 420,631', length: 246 },
        { name: '九横', path: 'M 313,651 L 319,658 L 413,647 L 447,647 L 460,653', length: 152 },
      ]
    },

  }
};
