// Shared notification bell logic for all pages
(function () {
  const notifications = JSON.parse(localStorage.getItem('adlib_notifications') || '[]');
  const unreadCount = notifications.filter(n => !n.read).length;

  const badge = document.getElementById('notifBadgeTop');
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  const dropdownList = document.getElementById('notifDropdownList');
  if (dropdownList) {
    if (notifications.length === 0) {
      dropdownList.innerHTML = '<p style="text-align:center;color:#6b7c74;padding:16px;font-size:13px;">No notifications</p>';
    } else {
      dropdownList.innerHTML = notifications.slice(0, 8).map(function (n) {
        return '<div class="notif-dropdown-item ' + (n.read ? '' : 'unread') + '">' +
          '<div class="notif-dropdown-dot ' + (n.read ? '' : 'active') + '"></div>' +
          '<div>' +
          '<div class="notif-dropdown-title">' + n.title + '</div>' +
          '<div class="notif-dropdown-detail">' + n.detail + '</div>' +
          '<div class="notif-dropdown-time">' + (n.time || '') + '</div>' +
          '</div></div>';
      }).join('');
    }
  }

  var btnTop = document.getElementById('notifBtnTop');
  if (btnTop) {
    btnTop.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = document.getElementById('notifDropdown');
      dd.classList.toggle('show');
      if (dd.classList.contains('show') && unreadCount > 0) {
        var updated = notifications.map(function (n) { return Object.assign({}, n, { read: true }); });
        localStorage.setItem('adlib_notifications', JSON.stringify(updated));
        badge.textContent = '0';
        badge.style.display = 'none';
      }
    });
  }

  document.addEventListener('click', function () {
    var dd = document.getElementById('notifDropdown');
    if (dd) dd.classList.remove('show');
  });

  var wrapper = document.getElementById('notifWrapper');
  if (wrapper) {
    wrapper.addEventListener('click', function (e) { e.stopPropagation(); });
  }
})();
