package com.bootcamp.backendintegrador.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "orders")
public class OrdersModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Order number is required")
    @NotBlank(message = "Order number must be complete")
    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @NotNull(message = "Issuance date is required")
    @Column(name = "issuance_date", nullable = false)
    private Timestamp issuanceDate;

    @NotNull(message = "Delivery date is required")
    @Column(name = "delivery_date", nullable = false)
    private Timestamp deliveryDate;

    @NotNull(message = "Reception information is required")
    @Lob
    @Column(name = "reception_info", nullable = false, columnDefinition = "TEXT")
    private String receptionInfo;

    @NotNull(message = "Supplier ID is required")
    @Column(name = "supplier_id", nullable = false)
    private Integer supplierId;

    @NotNull(message = "Active status is required")
    @Column(name = "active", nullable = false)
    private Boolean active;

    @NotNull(message = "Order status is required")
    @Column(name = "order_status", nullable = false)
    private Integer orderStatus;

    @NotNull(message = "User ID is required")
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    public OrdersModel() {

    }

    public OrdersModel(Integer id,
            String orderNumber,
            Timestamp issuanceDate,
            Timestamp deliveryDate,
            String receptionInfo,
            Integer supplierId,
            Boolean active,
            Integer orderStatus,
            Integer userId,
            Timestamp createdAt,
            Timestamp updatedAt) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.issuanceDate = issuanceDate;
        this.deliveryDate = deliveryDate;
        this.receptionInfo = receptionInfo;
        this.supplierId = supplierId;
        this.active = active;
        this.orderStatus = orderStatus;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Timestamp getIssuanceDate() {
        return issuanceDate;
    }

    public void setIssuanceDate(Timestamp issuanceDate) {
        this.issuanceDate = issuanceDate;
    }

    public Timestamp getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Timestamp deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getReceptionInfo() {
        return receptionInfo;
    }

    public void setReceptionInfo(String receptionInfo) {
        this.receptionInfo = receptionInfo;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
