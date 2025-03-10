
import React from "react";
import ImageGallery from "./ImageGallery";
import MainContent from "./MainContent";
import ReservationCard from "./ReservationCard";
import SimilarListings from "./SimilarListings";
import { Listing } from "@/types/listing";
import ListingHeader from "./ListingHeader";
import { SocialBar } from "@/components/social/SocialBar";

interface ListingDetailContainerProps {
  listing: Listing;
  processedImages: string[];
  listings: Listing[];
  averageRating: number;
  listingReviews: any[];
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  handleReservation: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  primaryColor: string;
  reviewText: string;
  setReviewText: (text: string) => void;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  isAuthenticated: boolean;
  handleSubmitReview: () => void;
  formatPriceFCFA: (price: number) => string;
}

const ListingDetailContainer = ({
  listing,
  processedImages,
  listings,
  averageRating,
  listingReviews,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  guestCount,
  setGuestCount,
  handleReservation,
  isFavorite,
  toggleFavorite,
  primaryColor,
  reviewText,
  setReviewText,
  reviewRating,
  setReviewRating,
  isAuthenticated,
  handleSubmitReview,
  formatPriceFCFA,
}: ListingDetailContainerProps) => {
  // URL complète pour le partage
  const shareUrl = `${window.location.origin}/logement/${listing.id}`;
  
  return (
    <div className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ListingHeader
        title={listing.title}
        location={listing.location}
        rating={averageRating}
      />

      <ImageGallery images={processedImages} alt={listing.title} />

      {/* Social Bar */}
      <div className="my-4">
        <SocialBar 
          type="listing" 
          itemId={listing.id} 
          title={listing.title}
          url={shareUrl}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainContent
          host={listing.host}
          description={listing.description}
          mapLocation={listing.mapLocation}
          averageRating={averageRating}
          reviewCount={listingReviews.length}
          listingReviews={listingReviews}
          reviewText={reviewText}
          setReviewText={setReviewText}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          isAuthenticated={isAuthenticated}
          handleSubmitReview={handleSubmitReview}
        />

        <div className="lg:sticky lg:top-24 h-fit">
          <ReservationCard
            price={formatPriceFCFA(listing.price)}
            averageRating={averageRating}
            reviewCount={listingReviews.length}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            handleReservation={handleReservation}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            primaryColor={primaryColor}
          />
        </div>
      </div>

      <SimilarListings
        listings={listings}
        currentListingId={listing.id}
        formatPriceFCFA={formatPriceFCFA}
      />
    </div>
  );
};

export default ListingDetailContainer;
