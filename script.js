

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        window.open(card.dataset.url, '_blank');
    });
});









    const colors = [
      '#c37b85',
      '#e34214',
      '#107471',
      '#4436ee',
      '#434542',
      '#4b7792',
      '#797595',
      '#355a65',
      '#b286f7',
      '#758627',
      '#707c94',
      '#f73f2e',
      '#2375f2',
      '#84816c',
      '#ec711d',
      '#150f85',
      '#073b43',
      '#370cad',
      '#0c363b'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    document.documentElement.style.setProperty('--primary-bg-color', randomColor );











    const videos = document.querySelectorAll('video');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.3 // play when at least 25% visible
    });

    videos.forEach(video => observer.observe(video));












      const words = ["Dutch Design Week", "Rietveld Paviljoen", "Gemeente Utrecht", "Kaboom Amination Festival", "Leiden Shorts", "Reggio Film Festival", "Kunst = Leuk", "Nijverheid", "Academie Galerie"];
      let index = 0;

      const span = document.getElementById("changing-text");

      setInterval(() => {
        index = (index + 1) % words.length;
        span.textContent = words[index];
      }, 300);

      $(document).on('mouseover', 'video', function() { //selecting the document 1st will grab new content
          $(this).get(0).play(); 
      }); 

      //pause video on mouse leave
      $(document).on('mouseleave', 'video', function() { 
          $(this).get(0).pause(); 
      });










