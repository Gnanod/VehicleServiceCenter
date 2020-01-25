package lk.vsc.DTO;

public class VehicleHistoryDTO {

    private String date ;
    private String serviceId ;
    private String detailJobAmount ;
    private String lubeJobAmount;
    private String serviceAmount;
    private String jobId ;
    private String presentOdometer ;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getDetailJobAmount() {
        return detailJobAmount;
    }

    public void setDetailJobAmount(String detailJobAmount) {
        this.detailJobAmount = detailJobAmount;
    }

    public String getLubeJobAmount() {
        return lubeJobAmount;
    }

    public void setLubeJobAmount(String lubeJobAmount) {
        this.lubeJobAmount = lubeJobAmount;
    }

    public String getServiceAmount() {
        return serviceAmount;
    }

    public void setServiceAmount(String serviceAmount) {
        this.serviceAmount = serviceAmount;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getPresentOdometer() {
        return presentOdometer;
    }

    public void setPresentOdometer(String presentOdometer) {
        this.presentOdometer = presentOdometer;
    }
}
