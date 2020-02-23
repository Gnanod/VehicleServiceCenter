package lk.vsc.service;

import lk.vsc.DTO.MakeModelDetailsDTO;
import lk.vsc.entity.Item;

import java.util.List;

public interface ItemService {

    Item addItem(Item item);

    Item getItems(String itemName);

    List<Item> getItemsToArray(String itemName);


    List<Item> getAllItems();

    List<MakeModelDetailsDTO> viewMakeModelDetailsForThisItem(String itemId);
}
