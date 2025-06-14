document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){e.preventDefault();const target=document.querySelector(this.getAttribute('href'));if(target){const headerOffset=80;const elementPosition=target.getBoundingClientRect().top;const offsetPosition=elementPosition+window.pageYOffset-headerOffset;window.scrollTo({top:offsetPosition,behavior:'smooth'});const glow=document.createElement('div');glow.className='nav-glow';glow.style.cssText=`
                position: absolute;
                top: ${e.clientY}px;
                left: ${e.clientX}px;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(0, 255, 153, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                animation: glowFade 0.5s ease-out forwards;
            `;document.body.appendChild(glow);setTimeout(()=>glow.remove(),500)}})});const glowStyle=document.createElement('style');glowStyle.textContent=`
    @keyframes glowFade {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
    }
`;document.head.appendChild(glowStyle);let lastScrollY=window.scrollY;window.addEventListener('scroll',function(){const header=document.querySelector('.header');const currentScrollY=window.scrollY;if(currentScrollY>100){header.style.background='rgba(10, 14, 26, 0.98)';header.style.boxShadow='0 4px 30px rgba(0, 255, 153, 0.1)';header.style.backdropFilter='blur(20px)'}else{header.style.background='rgba(10, 14, 26, 0.95)';header.style.boxShadow='none';header.style.backdropFilter='blur(10px)'}
if(currentScrollY>lastScrollY&&currentScrollY>200){header.style.transform='translateY(-100%)'}else{header.style.transform='translateY(0)'}
lastScrollY=currentScrollY});const floatingCalc=document.getElementById('floating-calc');if(floatingCalc){floatingCalc.addEventListener('click',function(){const calculatorSection=document.getElementById('calculator');if(calculatorSection){calculatorSection.scrollIntoView({behavior:'smooth',block:'center'});const calculatorCard=document.querySelector('.calculator-card');if(calculatorCard){calculatorCard.classList.add('scale-in');setTimeout(()=>{calculatorCard.classList.remove('scale-in')},300)}
for(let i=0;i<5;i++){const particle=document.createElement('div');particle.style.cssText=`
                    position: fixed;
                    bottom: 50px;
                    right: 50px;
                    width: 8px;
                    height: 8px;
                    background: #00ff99;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleBurst ${0.5 + i * 0.1}s ease-out forwards;
                `;document.body.appendChild(particle);setTimeout(()=>particle.remove(),1000)}}})}
const particleStyle=document.createElement('style');particleStyle.textContent=`
    @keyframes particleBurst {
        0% { transform: translate(0, 0); opacity: 1; }
        100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;document.head.appendChild(particleStyle);function calculateMovingCost(){const button=document.querySelector('.calc-btn');const moveSize=document.getElementById('move-size').value;const moveDistance=document.getElementById('move-distance').value;const resultsDiv=document.getElementById('results');if(!moveSize||!moveDistance){showNotification('Please select both move size and distance','error');return}
button.classList.add('loading');setTimeout(()=>{let baseCost=0;let baseTime=0;switch(moveSize){case 'studio':baseCost=300;baseTime=3;break;case '2bed':baseCost=500;baseTime=5;break;case '3bed':baseCost=800;baseTime=7;break;case '4bed':baseCost=1200;baseTime=9;break;case 'office':baseCost=1000;baseTime=8;break}
let distanceMultiplier=1;let distanceAddTime=0;let distanceType='Local';switch(moveDistance){case 'local':distanceMultiplier=1;distanceAddTime=0;distanceType='Local';break;case 'instate':distanceMultiplier=2.5;distanceAddTime=4;distanceType='In-State';break;case 'longdist':distanceMultiplier=4;distanceAddTime=8;distanceType='Long Distance';break}
const lowEstimate=Math.round(baseCost*distanceMultiplier*0.9);const highEstimate=Math.round(baseCost*distanceMultiplier*1.3);const totalTime=baseTime+distanceAddTime;document.getElementById('cost-estimate').textContent=`$${lowEstimate.toLocaleString()} - $${highEstimate.toLocaleString()}`;document.getElementById('cost-details').textContent=`Estimated cost for your ${distanceType} move`;document.getElementById('time-estimate').textContent=`${totalTime} - ${totalTime + 2} hours`;document.getElementById('time-details').textContent=`Including loading, transport, and unloading`;resultsDiv.style.display='block';resultsDiv.classList.add('fade-in');button.classList.remove('loading');showNotification('Estimate calculated! Contact us for a precise quote.','success');setTimeout(()=>{resultsDiv.scrollIntoView({behavior:'smooth',block:'nearest'})},300)},1500)}
function showNotification(message,type='info'){const existing=document.querySelector('.notification');if(existing)existing.remove();const notification=document.createElement('div');notification.className=`notification notification-${type}`;const icon=type==='success'?'check-circle':type==='error'?'times-circle':type==='warning'?'exclamation-triangle':'info-circle';notification.innerHTML=`
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;notification.style.cssText=`
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff99' : 
                     type === 'error' ? '#ff4444' : 
                     type === 'warning' ? '#ffaa00' : '#00ccff'};
        color: #0a0e1a;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        backdrop-filter: blur(10px);
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    `;document.body.appendChild(notification);const closeBtn=notification.querySelector('.notification-close');closeBtn.style.cssText=`
        background: none;
        border: none;
        color: #0a0e1a;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: 0.5rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    `;closeBtn.addEventListener('click',()=>{notification.style.animation='slideOutRight 0.3s ease-in forwards';setTimeout(()=>notification.remove(),300)});setTimeout(()=>{if(notification.parentNode){notification.style.animation='slideOutRight 0.3s ease-in forwards';setTimeout(()=>notification.remove(),300)}},7000)}
const notificationStyles=document.createElement('style');notificationStyles.textContent=`
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
   }
   .notification-close:hover {
       background: rgba(255, 255, 255, 0.2) !important;
   }
`;document.head.appendChild(notificationStyles);function initializeFAQ(){const faqQuestions=document.querySelectorAll('.faq-question');faqQuestions.forEach(question=>{question.addEventListener('click',function(){const answer=this.nextElementSibling;const isOpen=this.getAttribute('aria-expanded')==='true';faqQuestions.forEach(q=>{if(q!==this){q.setAttribute('aria-expanded','false');q.nextElementSibling.classList.remove('open');q.nextElementSibling.style.maxHeight='0'}});if(isOpen){this.setAttribute('aria-expanded','false');answer.classList.remove('open');answer.style.maxHeight='0'}else{this.setAttribute('aria-expanded','true');answer.classList.add('open');answer.style.maxHeight=answer.scrollHeight+'px'}})})}
function validateEmail(email){const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return emailRegex.test(email)}
function validatePhone(phone){const phoneRegex=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;return phoneRegex.test(phone)}
function validateDate(dateString){const selectedDate=new Date(dateString);const today=new Date();today.setHours(0,0,0,0);return selectedDate>=today}
function formatDate(date){const options={year:'numeric',month:'long',day:'numeric',weekday:'long'};return date.toLocaleDateString('en-US',options)}
document.addEventListener('DOMContentLoaded',function(){const bookingForm=document.getElementById('booking-form');if(bookingForm){bookingForm.addEventListener('submit',function(e){e.preventDefault();const submitButton=this.querySelector('button[type="submit"]');const customerName=document.getElementById('customer-name').value.trim();const phone=document.getElementById('phone').value.trim();const moveDate=document.getElementById('move-date').value;if(!customerName){showNotification('Please enter your full name','error');document.getElementById('customer-name').focus();return}
if(customerName.length<2){showNotification('Please enter a valid name','error');document.getElementById('customer-name').focus();return}
if(!phone){showNotification('Please enter your phone number','error');document.getElementById('phone').focus();return}
if(!validatePhone(phone)){showNotification('Please enter a valid phone number (e.g., 813-555-0123)','error');document.getElementById('phone').focus();return}
if(!moveDate){showNotification('Please select your preferred move date','error');document.getElementById('move-date').focus();return}
if(!validateDate(moveDate)){showNotification('Please select a future date for your move','error');document.getElementById('move-date').focus();return}
const selectedDate=new Date(moveDate);const dayOfWeek=selectedDate.getDay();if(dayOfWeek===0||dayOfWeek===6){showNotification('Weekend moves may have additional fees - we\'ll discuss this in your quote','warning')}
submitButton.classList.add('loading');setTimeout(()=>{submitButton.classList.remove('loading');showNotification(`Thank you, ${customerName}! We'll contact you at ${phone} to schedule your move on ${formatDate(selectedDate)}.`,'success');bookingForm.reset();setTimeout(()=>{document.getElementById('contact').scrollIntoView({behavior:'smooth'})},2000)},2000)})}
const contactForm=document.getElementById('contact-form');if(contactForm){contactForm.addEventListener('submit',function(e){e.preventDefault();const submitButton=this.querySelector('.form-submit-btn');const customerName=document.getElementById('contact-name').value.trim();const phone=document.getElementById('contact-phone').value.trim();const email=document.getElementById('contact-email').value.trim();if(!customerName||!phone||!email){showNotification('Please fill in all required fields','error');return}
if(!validateEmail(email)){showNotification('Please enter a valid email address','error');document.getElementById('contact-email').focus();return}
if(!validatePhone(phone)){showNotification('Please enter a valid phone number','error');document.getElementById('contact-phone').focus();return}
submitButton.classList.add('loading');setTimeout(()=>{submitButton.classList.remove('loading');showNotification(`Thank you, ${customerName}! We've received your request and will contact you within 24 hours with your personalized moving quote.`,'success');contactForm.reset()},2000)})}});function initializeScrollAnimations(){const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};const observer=new IntersectionObserver(function(entries){entries.forEach(entry=>{if(entry.isIntersecting){const element=entry.target;element.style.opacity='1';element.style.transform='translateY(0)';if(element.classList.contains('stagger')){const children=element.children;Array.from(children).forEach((child,index)=>{setTimeout(()=>{child.style.opacity='1';child.style.transform='translateY(0)'},index*100)})}}})},observerOptions);const animatedElements=document.querySelectorAll(`
       .quote-option,
       .point,
       .calculator-card,
       .login-card,
       .client-benefits,
       .contact-item,
       .hero-stats,
       .value-points,
       .service-card,
       .benefit-item,
       .step-item,
       .testimonial-card,
       .credential-card,
       .article-card
   `);animatedElements.forEach(element=>{element.style.opacity='0';element.style.transform='translateY(30px)';element.style.transition='opacity 0.8s ease, transform 0.8s ease';observer.observe(element)})}
function initializeTestimonials(){const testimonials=document.querySelectorAll('.testimonial');const buttons=document.querySelectorAll('.testimonial-btn');let currentIndex=0;const intervalTime=6000;let autoRotate;function showTestimonial(index){testimonials.forEach((testimonial,i)=>{testimonial.classList.remove('active');if(buttons[i])buttons[i].classList.remove('active');});if(testimonials[index]){testimonials[index].classList.add('active');if(buttons[index])buttons[index].classList.add('active');currentIndex=index}}
function startAutoRotate(){autoRotate=setInterval(()=>{currentIndex=(currentIndex+1)%testimonials.length;showTestimonial(currentIndex)},intervalTime)}
function stopAutoRotate(){if(autoRotate){clearInterval(autoRotate)}}
buttons.forEach((button,index)=>{button.addEventListener('click',()=>{stopAutoRotate();showTestimonial(index);startAutoRotate()})});let startX=0;let endX=0;const carousel=document.querySelector('.testimonial-carousel');if(carousel){carousel.addEventListener('touchstart',(e)=>{startX=e.touches[0].clientX});carousel.addEventListener('touchend',(e)=>{endX=e.changedTouches[0].clientX;handleSwipe()})}
function handleSwipe(){const threshold=50;const diff=startX-endX;if(Math.abs(diff)>threshold){stopAutoRotate();if(diff>0){currentIndex=(currentIndex+1)%testimonials.length}else{currentIndex=(currentIndex-1+testimonials.length)%testimonials.length}
showTestimonial(currentIndex);startAutoRotate()}}
if(testimonials.length>0){showTestimonial(0);startAutoRotate();carousel?.addEventListener('mouseenter',stopAutoRotate);carousel?.addEventListener('mouseleave',startAutoRotate)}}
document.addEventListener('DOMContentLoaded',function(){const buttons=document.querySelectorAll('.btn');buttons.forEach(button=>{button.addEventListener('mouseenter',function(){this.style.transform='translateY(-3px) scale(1.02)';this.style.boxShadow='0 12px 35px rgba(0, 255, 153, 0.6)';this.style.textShadow='0 0 15px rgba(255, 255, 255, 0.5)';const rect=this.getBoundingClientRect();for(let i=0;i<3;i++){const particle=document.createElement('div');particle.style.cssText=`
                   position: absolute;
                   top: ${rect.top + rect.height / 2}px;
                   left: ${rect.left + rect.width / 2}px;
                   width: 6px;
                   height: 6px;
                   background: #00ccff;
                   border-radius: 50%;
                   pointer-events: none;
                   animation: particleHover ${0.4 + i * 0.1}s ease-out forwards;
               `;document.body.appendChild(particle);setTimeout(()=>particle.remove(),600)}});button.addEventListener('mouseleave',function(){this.style.transform='translateY(0) scale(1)';this.style.boxShadow='0 8px 25px rgba(0, 255, 153, 0.4)';this.style.textShadow='0 0 5px rgba(255, 255, 255, 0.3)'})});const particleHoverStyle=document.createElement('style');particleHoverStyle.textContent=`
       @keyframes particleHover {
           0% { transform: translate(0, 0); opacity: 1; }
           100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); opacity: 0; }
       }
   `;document.head.appendChild(particleHoverStyle)});function initializeServicePageFeatures(){const accordionHeaders=document.querySelectorAll('.accordion-header');accordionHeaders.forEach(header=>{header.addEventListener('click',function(){const content=this.nextElementSibling;const isOpen=content.style.maxHeight&&content.style.maxHeight!=='0px';accordionHeaders.forEach(h=>{const c=h.nextElementSibling;c.style.maxHeight='0px';h.classList.remove('active')});if(!isOpen){content.style.maxHeight=content.scrollHeight+'px';this.classList.add('active')}})});const processSteps=document.querySelectorAll('.step-item');processSteps.forEach((step,index)=>{step.addEventListener('mouseenter',function(){processSteps.forEach((s,i)=>{if(i<=index){s.style.opacity='1';s.style.transform='translateY(-5px)'}else{s.style.opacity='0.7'}})});step.addEventListener('mouseleave',function(){processSteps.forEach(s=>{s.style.opacity='1';s.style.transform='translateY(0)'})})})}
function initializeResourcePageFeatures(){const timelineItems=document.querySelectorAll('.timeline-item');const timelineObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)'}})},{threshold:0.2});timelineItems.forEach(item=>{item.style.opacity='0';item.style.transform='translateY(30px)';item.style.transition='all 0.6s ease';timelineObserver.observe(item)});const checklistItems=document.querySelectorAll('.checklist-category input[type="checkbox"]');checklistItems.forEach(checkbox=>{checkbox.addEventListener('change',function(){const listItem=this.closest('li');if(this.checked){listItem.style.background='rgba(0, 255, 153, 0.1)';listItem.style.textDecoration='line-through';listItem.style.opacity='0.7'}else{listItem.style.background='';listItem.style.textDecoration='';listItem.style.opacity='1'}})});function saveChecklistProgress(){const checkedItems=Array.from(checklistItems).map(item=>item.checked);try{localStorage.setItem('limitless-moving-checklist',JSON.stringify(checkedItems))}catch(e){}}
function loadChecklistProgress(){try{const saved=localStorage.getItem('limitless-moving-checklist');if(saved){const checkedItems=JSON.parse(saved);checklistItems.forEach((item,index)=>{if(checkedItems[index]){item.checked=!0;item.dispatchEvent(new Event('change'))}})}}catch(e){}}
loadChecklistProgress();checklistItems.forEach(checkbox=>{checkbox.addEventListener('change',saveChecklistProgress)})}
function initializeAllFeatures(){initializeScrollAnimations();initializeFAQ();initializeTestimonials();initializeServicePageFeatures();initializeResourcePageFeatures();document.addEventListener('keydown',function(e){if(e.key==='Escape'){const notification=document.querySelector('.notification');if(notification){notification.querySelector('.notification-close').click()}
document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(q=>{q.click()})}
if(e.key==='ArrowLeft'||e.key==='ArrowRight'){const activeBtn=document.querySelector('.testimonial-btn.active');if(activeBtn){const buttons=Array.from(document.querySelectorAll('.testimonial-btn'));const currentIndex=buttons.indexOf(activeBtn);let newIndex;if(e.key==='ArrowLeft'){newIndex=(currentIndex-1+buttons.length)%buttons.length}else{newIndex=(currentIndex+1)%buttons.length}
buttons[newIndex].click();e.preventDefault()}}});const focusableElements=document.querySelectorAll(`
       button, [href], input, select, textarea, 
       [tabindex]:not([tabindex="-1"])
   `);focusableElements.forEach(element=>{element.addEventListener('focus',function(){this.scrollIntoView({behavior:'smooth',block:'nearest'})})});const calcButton=document.querySelector('.calc-btn');if(calcButton){calcButton.addEventListener('click',calculateMovingCost)}
const dropdowns=document.querySelectorAll('.dropdown');dropdowns.forEach(dropdown=>{let hoverTimer;dropdown.addEventListener('mouseenter',()=>{clearTimeout(hoverTimer);dropdown.classList.add('dropdown-open')});dropdown.addEventListener('mouseleave',()=>{hoverTimer=setTimeout(()=>{dropdown.classList.remove('dropdown-open')},150)})})}
document.addEventListener('DOMContentLoaded',initializeAllFeatures);function initializeLazyLoading(){const images=document.querySelectorAll('img[data-src]');const imageObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){const img=entry.target;img.src=img.dataset.src;img.classList.remove('lazy');imageObserver.unobserve(img)}})});images.forEach(img=>imageObserver.observe(img))}
document.addEventListener('DOMContentLoaded',initializeLazyLoading);function safeQuerySelector(selector){try{return document.querySelector(selector)}catch(e){console.warn(`Element not found: ${selector}`);return null}}
function debounce(func,wait){let timeout;return function executedFunction(...args){const later=()=>{clearTimeout(timeout);func(...args)};clearTimeout(timeout);timeout=setTimeout(later,wait)}}
window.addEventListener('load',()=>{const perfData=performance.getEntriesByType('navigation')[0];if(perfData){console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`)}})