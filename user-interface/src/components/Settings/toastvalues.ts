import { sortOrderValues, sortTypeValues } from "../../types";

export var sortToastMessage = "Сортировка по";

export var sortToasts = new Map<number, string>();
sortToasts.set(sortTypeValues.DISCOUNT, "скидке");
sortToasts.set(sortTypeValues.PRICE, "цене");
sortToasts.set(sortOrderValues.ASCENDING, "возрастанию");
sortToasts.set(sortOrderValues.DESCENDING, "убыванию");
