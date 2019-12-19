set time zone +7;

create table if not exists server_ip
(
    ip varchar(15) not null,
    lastUpdate timestamp not null
);

insert into server_ip (ip, lastUpdate)
values ('127.0.0.1', NOW());