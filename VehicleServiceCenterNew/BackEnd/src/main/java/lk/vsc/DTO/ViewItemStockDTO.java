package lk.vsc.DTO;

import lk.vsc.entity.MakeModelDetails;

import java.util.Set;

public class ViewItemStockDTO {

    private String itemCode;
    private String itemName;
    private String quantityType;
    private String currentQty;
    private String qtyPrice;
    private Set<MakeModelDetails> makeModelDetailsList;

    public Set<MakeModelDetails> getMakeModelDetailsList() {
        return makeModelDetailsList;
    }

    public void setMakeModelDetailsList(Set<MakeModelDetails> makeModelDetailsList) {
        this.makeModelDetailsList = makeModelDetailsList;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(String quantityType) {
        this.quantityType = quantityType;
    }

    public String getCurrentQty() {
        return currentQty;
    }

    public void setCurrentQty(String currentQty) {
        this.currentQty = currentQty;
    }

    public String getQtyPrice() {
        return qtyPrice;
    }

    public void setQtyPrice(String qtyPrice) {
        this.qtyPrice = qtyPrice;
    }
}
