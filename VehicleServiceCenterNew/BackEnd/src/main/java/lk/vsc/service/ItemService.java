package lk.vsc.service;

import lk.vsc.entity.Item;

import java.util.List;

public interface ItemService {

    Item addItem(Item item);

    Item getItems(String itemName);

    List<Item> getItemsToArray(String itemName);


}
