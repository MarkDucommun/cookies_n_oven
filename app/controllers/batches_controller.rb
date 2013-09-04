class BatchesController < ApplicationController
  def show
    batch = Batch.find(params[:id])
    render json: batch
  end

  def create
    batch = Batch.new
    batch.cookie_type = params[:cookie_type]
    batch.bake_time = params[:bake_time]
    batch.save
    render text: batch.id
  end

  def update
    batch = Batch.find(params[:id])
    batch.location = params[:location] if params[:location]
    batch.cookie_status = params[:cookie_status] if params[:cookie_status]
    batch.save
    render json: batch
  end
end
