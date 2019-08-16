package lk.vsc.service;

import lk.vsc.entity.Item;

public interface ItemService {

    Item addItem(Item item);

    Item getItems(String itemName);

}
