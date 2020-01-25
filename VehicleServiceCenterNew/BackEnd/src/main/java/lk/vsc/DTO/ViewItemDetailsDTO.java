package lk.vsc.DTO;

public class ViewItemDetailsDTO {

    private String itemCode;
    private String itemQuantityType;
    private String itemQuantity;

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemQuantityType() {
        return itemQuantityType;
    }

    public void setItemQuantityType(String itemQuantityType) {
        this.itemQuantityType = itemQuantityType;
    }

    public String getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(String itemQuantity) {
        this.itemQuantity = itemQuantity;
    }
}
