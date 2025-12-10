(function(){
  var iframe = document.getElementById('heroVideo');
  if (!iframe) return;
  var player = new Vimeo.Player(iframe);
  // Tenta iniciar com áudio
  player.setVolume(1).then(function(){
    return player.play();
  }).catch(function(){
    // Se o navegador bloquear, inicia mudo e mostra botão para ativar som
    player.setMuted(true);
    player.play();
    var btn = document.getElementById('unmuteBtn');
    if (btn) {
      btn.classList.remove('hidden');
      btn.addEventListener('click', function(){
        player.setMuted(false);
        player.setVolume(1);
        btn.classList.add('hidden');
      });
    }
  });
})();
