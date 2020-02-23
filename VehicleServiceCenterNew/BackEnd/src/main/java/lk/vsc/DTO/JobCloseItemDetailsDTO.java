package lk.vsc.DTO;

public class JobCloseItemDetailsDTO {

    private int job_order_service_details_id;
    private String itemId;
    private String itemName;
    private String qtyType;
    private double qtyPrice;
    private double qty;
    private String topUpChange;
    private String itemStatus;
    private double updateQty;


    public int getJob_order_service_details_id() {
        return job_order_service_details_id;
    }

    public void setJob_order_service_details_id(int job_order_service_details_id) {
        this.job_order_service_details_id = job_order_service_details_id;
    }

    public double getUpdateQty() {
        return updateQty;
    }

    public void setUpdateQty(double updateQty) {
        this.updateQty = updateQty;
    }

    public String getTopUpChange() {
        return topUpChange;
    }

    public void setTopUpChange(String topUpChange) {
        this.topUpChange = topUpChange;
    }

    public String getItemStatus() {
        return itemStatus;
    }

    public void setItemStatus(String itemStatus) {
        this.itemStatus = itemStatus;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getQtyType() {
        return qtyType;
    }

    public void setQtyType(String qtyType) {
        this.qtyType = qtyType;
    }

    public double getQtyPrice() {
        return qtyPrice;
    }

    public void setQtyPrice(double qtyPrice) {
        this.qtyPrice = qtyPrice;
    }

    public double getQty() {
        return qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }
}
