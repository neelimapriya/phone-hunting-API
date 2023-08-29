const loadPhone= async(searchText,isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data =await res.json();
    const phones =data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll)
}
const displayPhones =(phones, isShowAll) =>{
    // console.log(phones)

    const phoneContainer =document.getElementById('phone-container')
    // clear phone container cards before adding new
    phoneContainer.textContent='';
      // display show all button if there more then 12 button
      const showAllContainer =document.getElementById('show-all-container')

      if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
      }
      else{
        showAllContainer.classList.add('hidden')
      }


      // console.log(isShowAll)
    // display only first 12 phones
    if(!isShowAll){
      phones =phones.slice(0,12);
    }

    phones.forEach(phones => {
        // console.log(phones);
        // 2. create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList=`card bg-gray-200 p-4
         bg-base-100 shadow-xl`;
        // 3. set innerHtml
        phoneCard.innerHTML=`
        <figure><img src="${phones.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phones.phone_name }</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phones.slug}'); show_detail_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>`;
        // 4.append child
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}
// 
const handleShowDetail=async(id)=>{
  console.log('click show detail', id)
  // load single phone data
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data =await res.json();
  const phones=data.data;

  showPhoneDetails(phones)
}

const showPhoneDetails=(phones)=>{
  console.log(phones)
  const phoneName=document.getElementById('modal-phone-name')
  phoneName.innerText= phones.name;
  const showDetailContainer=document.getElementById('show-detail-container');
  showDetailContainer.innerHTML=`
  <img src="${phones.image}">
  <p><span>storage:</span>${phones?.mainFeatures?.storage } <p>
  
  <p><span>GPS:</span>${phones?.others?.GPS || 'No GPS'}
 
  `
   // ternary system alternative
  //  <p><span>GPS:</span>${phones?.others?.GPS? phones.others.GPS : 'No GPS available'}

  // show the modal
  show_detail_modal.showModal()
}



// handle search button
const handleSearch=(isShowAll)=>{
  toggleLoadingSpinner(true);
    const searchField =document.getElementById('search-field');
    const searchText =searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner=(isLoading)=>{
  const loadingSpinner =document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll =()=>{
  handleSearch(true);
}



