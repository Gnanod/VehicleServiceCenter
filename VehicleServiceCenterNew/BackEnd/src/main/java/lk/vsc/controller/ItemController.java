package lk.vsc.controller;

import lk.vsc.entity.Item;
import lk.vsc.entity.MakeModel;
import lk.vsc.entity.MakeModelDetails;
import lk.vsc.entity.Supplier;
import lk.vsc.service.ItemService;
import lk.vsc.service.MakeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/ItemController")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping(value = "/addItemDB")
    public Item addItem(@RequestBody Item item){

        Set<MakeModelDetails> l1 = item.getMakeModelDetails();

        return  itemService.addItem(item);

    }

    @GetMapping(value = "/getItemDetailsByName/{itemName}")
    public Item getItems(@PathVariable String itemName){
        return itemService.getItems(itemName);
    }

}
