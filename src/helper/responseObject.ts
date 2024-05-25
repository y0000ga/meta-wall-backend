import { CustomResponseType } from '../type/customResponse.type';

// js 不一定要靠 class 或 constructor 才能建立 instance，直接操作 prototype 也可以
// js 是透過 class 來包裝的 prototype-based，簡化 JS 中操作 constructor 的語法糖
// 透過 class 來建構 instance (object)，內部包含 property 和 method，instance 可以使用 class 內的 method，並透過 method 存取 object 內的資料

// 如果要產生 Response 就用 ResponseObject 這個 class 來建構 instance/ object 以產生 Response object
export class ResponseObject {
  public readonly status: CustomResponseType = CustomResponseType.SYSTEM_ERROR;
  public readonly message: string = '';
  public readonly data: unknown = null;

  // public 代表可以被外部訪問
  // readonly 代表初始化之後就不能再更動

  constructor(
    options: {
      status?: CustomResponseType;
      message?: string;
      data?: unknown;
    } = {},
  ) {
    this.status = options.status || this.status;
    this.message = options.message || this.message;
    this.data = options.data || this.data;
  }
}

// Note

// Class-based 和 prototype-based 是兩種不同的物件創建和繼承模型。

// Class-based（基於類別的）：
// 在類別基礎的語言中，物件是通過類別來創建的。類別是一種模板，定義了物件的屬性和方法。
// 物件通過實例化類別來創建，這意味著物件是類別的實例。
// 類別可以被繼承，子類別可以繼承父類別的屬性和方法，並且可以添加新的屬性和方法。
// 典型的類別基礎語言包括 Java、C++ 和 Python。

// Prototype-based（基於原型的）：
// 在原型基礎的語言中，物件直接從其他物件克隆而來，而不是通過類別來創建。
// 每個物件都有一個原型物件，新物件繼承原型物件的屬性和方法。
// 物件之間的關係是通過原型鏈建立的，一個物件可以作為另一個物件的原型。
// 物件可以動態地修改原型物件，這會影響到所有基於該原型的物件。
// 典型的原型基礎語言包括 JavaScript。

// 主要的差異在於物件創建的方式和繼承機制。在類別基礎的語言中，物件是通過類別來創建的，而繼承是通過類別之間的關係實現的。而在原型基礎的語言中，物件是直接從其他物件派生的，而繼承是通過原型鏈建立的。
